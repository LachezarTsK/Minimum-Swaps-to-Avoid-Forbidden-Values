
using System;
using System.Collections.Generic;

public class Solution
{
    private static readonly int NOT_POSSIBLE = -1;

    public int MinSwaps(int[] input, int[] forbidden)
    {
        if (!IsPossibleToPairEachInputValueWithDifferentForbiddenValue(input, forbidden))
        {
            return NOT_POSSIBLE;
        }
        return CalculateMinSwaps(input, forbidden);
    }

    private bool IsPossibleToPairEachInputValueWithDifferentForbiddenValue(int[] input, int[] forbidden)
    {
        Dictionary<int, int> allValuesToFrequency = [];

        for (int i = 0; i < input.Length; ++i)
        {
            allValuesToFrequency.TryAdd(input[i], 0);
            ++allValuesToFrequency[input[i]];

            allValuesToFrequency.TryAdd(forbidden[i], 0);
            ++allValuesToFrequency[forbidden[i]];
        }

        foreach (int frequency in allValuesToFrequency.Values)
        {
            if (frequency > input.Length)
            {
                return false;
            }
        }
        return true;
    }

    private int CalculateMinSwaps(int[] input, int[] forbidden)
    {
        int totalFrequencyOfSwapValues = 0;
        int maxFrequencyOfSingleSwapValue = 0;
        Dictionary<int, int> swapValuesToFrequency = [];

        for (int i = 0; i < input.Length; ++i)
        {
            if (input[i] == forbidden[i])
            {
                swapValuesToFrequency.TryAdd(input[i], 0);
                ++swapValuesToFrequency[input[i]];

                ++totalFrequencyOfSwapValues;
                maxFrequencyOfSingleSwapValue = Math.Max(maxFrequencyOfSingleSwapValue, swapValuesToFrequency[input[i]]);
            }
        }
        return Math.Max((totalFrequencyOfSwapValues + 1) / 2, maxFrequencyOfSingleSwapValue);
    }
}
