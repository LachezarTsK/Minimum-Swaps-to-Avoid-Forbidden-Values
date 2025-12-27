
package main

const NOT_POSSIBLE = -1

func minSwaps(input []int, forbidden []int) int {
    if !isPossibleToPairEachInputValueWithDifferentForbiddenValue(input, forbidden) {
        return NOT_POSSIBLE
    }
    return calculateMinSwaps(input, forbidden)
}

func isPossibleToPairEachInputValueWithDifferentForbiddenValue(input []int, forbidden []int) bool {
    allValuesToFrequency := map[int]int{}

    for i := range input {
        allValuesToFrequency[input[i]] = getOrDefault(allValuesToFrequency, input[i], 0) + 1
        allValuesToFrequency[forbidden[i]] = getOrDefault(allValuesToFrequency, forbidden[i], 0) + 1
    }

    for _, frequency := range allValuesToFrequency {
        if frequency > len(input) {
            return false
        }
    }
    return true
}

func calculateMinSwaps(input []int, forbidden []int) int {
    totalFrequencyOfSwapValues := 0
    maxFrequencyOfSingleSwapValue := 0
    swapValuesToFrequency := map[int]int{}

    for i := range input {
        if input[i] == forbidden[i] {
            swapValuesToFrequency[input[i]] = getOrDefault(swapValuesToFrequency, input[i], 0) + 1

            totalFrequencyOfSwapValues++
            maxFrequencyOfSingleSwapValue = max(maxFrequencyOfSingleSwapValue, swapValuesToFrequency[input[i]])
        }
    }
    return max((totalFrequencyOfSwapValues + 1) / 2, maxFrequencyOfSingleSwapValue)
}

func getOrDefault[Key comparable, Value any](toCheck map[Key]Value, key Key, defaultValue Value) Value {
    if value, has := toCheck[key]; has {
        return value
    }
    return defaultValue
}
