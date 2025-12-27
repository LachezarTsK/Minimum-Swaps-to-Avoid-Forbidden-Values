
#include <span>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {

    static const int NOT_POSSIBLE = -1;

public:
    int minSwaps(const vector<int>& input, vector<int>& forbidden) const {
        if (!isPossibleToPairEachInputValueWithDifferentForbiddenValue(input, forbidden)) {
            return NOT_POSSIBLE;
        }
        return calculateMinSwaps(input, forbidden);
    }

private:
    bool isPossibleToPairEachInputValueWithDifferentForbiddenValue(span<const int> input, span<const int> forbidden) const {
        unordered_map<int, int> allValuesToFrequency;

        for (int i = 0; i < input.size(); ++i) {
            ++allValuesToFrequency[input[i]];
            ++allValuesToFrequency[forbidden[i]];
        }

        for (const auto& [_, frequency] : allValuesToFrequency) {
            if (frequency > input.size()) {
                return false;
            }
        }
        return true;
    }

    int calculateMinSwaps(span<const int> input, span<const int> forbidden) const {
        int totalFrequencyOfSwapValues = 0;
        int maxFrequencyOfSingleSwapValue = 0;
        unordered_map<int, int> swapValuesToFrequency;

        for (int i = 0; i < input.size(); ++i) {
            if (input[i] == forbidden[i]) {
                ++swapValuesToFrequency[input[i]];
                ++totalFrequencyOfSwapValues;
                maxFrequencyOfSingleSwapValue = max(maxFrequencyOfSingleSwapValue, swapValuesToFrequency[input[i]]);
            }
        }
        return max((totalFrequencyOfSwapValues + 1) / 2, maxFrequencyOfSingleSwapValue);
    }
};
