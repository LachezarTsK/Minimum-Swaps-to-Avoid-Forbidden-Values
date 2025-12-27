
import java.util.HashMap;
import java.util.Map;

public class Solution {

    private static final int NOT_POSSIBLE = -1;

    public int minSwaps(int[] input, int[] forbidden) {
        if (!isPossibleToPairEachInputValueWithDifferentForbiddenValue(input, forbidden)) {
            return NOT_POSSIBLE;
        }
        return calculateMinSwaps(input, forbidden);
    }

    private boolean isPossibleToPairEachInputValueWithDifferentForbiddenValue(int[] input, int[] forbidden) {
        Map<Integer, Integer> allValuesToFrequency = new HashMap<>();

        for (int i = 0; i < input.length; ++i) {
            allValuesToFrequency.put(input[i], allValuesToFrequency.getOrDefault(input[i], 0) + 1);
            allValuesToFrequency.put(forbidden[i], allValuesToFrequency.getOrDefault(forbidden[i], 0) + 1);
        }

        for (int frequency : allValuesToFrequency.values()) {
            if (frequency > input.length) {
                return false;
            }
        }
        return true;
    }

    private int calculateMinSwaps(int[] input, int[] forbidden) {
        int totalFrequencyOfSwapValues = 0;
        int maxFrequencyOfSingleSwapValue = 0;
        Map<Integer, Integer> swapValuesToFrequency = new HashMap<>();

        for (int i = 0; i < input.length; ++i) {
            if (input[i] == forbidden[i]) {
                swapValuesToFrequency.put(input[i], swapValuesToFrequency.getOrDefault(input[i], 0) + 1);

                ++totalFrequencyOfSwapValues;
                maxFrequencyOfSingleSwapValue = Math.max(maxFrequencyOfSingleSwapValue, swapValuesToFrequency.get(input[i]));
            }
        }
        return Math.max((totalFrequencyOfSwapValues + 1) / 2, maxFrequencyOfSingleSwapValue);
    }
}
