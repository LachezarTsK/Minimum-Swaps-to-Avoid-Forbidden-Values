
import kotlin.math.max

class Solution {

    private companion object {
        const val NOT_POSSIBLE = -1
    }

    fun minSwaps(input: IntArray, forbidden: IntArray): Int {
        if (!isPossibleToPairEachInputValueWithDifferentForbiddenValue(input, forbidden)) {
            return NOT_POSSIBLE
        }
        return calculateMinSwaps(input, forbidden)
    }

    private fun isPossibleToPairEachInputValueWithDifferentForbiddenValue(input: IntArray, forbidden: IntArray): Boolean {
        val allValuesToFrequency = mutableMapOf<Int, Int>()

        for (i in input.indices) {
            allValuesToFrequency[input[i]] = allValuesToFrequency.getOrDefault(input[i], 0) + 1
            allValuesToFrequency[forbidden[i]] = allValuesToFrequency.getOrDefault(forbidden[i], 0) + 1
        }

        for (frequency in allValuesToFrequency.values) {
            if (frequency > input.size) {
                return false
            }
        }
        return true
    }

    private fun calculateMinSwaps(input: IntArray, forbidden: IntArray): Int {
        var totalFrequencyOfSwapValues = 0
        var maxFrequencyOfSingleSwapValue = 0
        val swapValuesToFrequency = mutableMapOf<Int, Int>()

        for (i in input.indices) {
            if (input[i] == forbidden[i]) {
                swapValuesToFrequency[input[i]] = swapValuesToFrequency.getOrDefault(input[i], 0) + 1

                ++totalFrequencyOfSwapValues
                maxFrequencyOfSingleSwapValue = max(maxFrequencyOfSingleSwapValue, swapValuesToFrequency[input[i]]!!)
            }
        }
        return max((totalFrequencyOfSwapValues + 1) / 2, maxFrequencyOfSingleSwapValue)
    }
}
