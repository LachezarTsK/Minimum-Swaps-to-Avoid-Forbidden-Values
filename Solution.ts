
function minSwaps(input: number[], forbidden: number[]): number {
    const NOT_POSSIBLE = -1;
    if (!isPossibleToPairEachInputValueWithDifferentForbiddenValue(input, forbidden)) {
        return NOT_POSSIBLE;
    }
    return calculateMinSwaps(input, forbidden);
};

function isPossibleToPairEachInputValueWithDifferentForbiddenValue(input: number[], forbidden: number[]): boolean {
    const allValuesToFrequency = new CustomizedMap<number, number>();

    for (let i = 0; i < input.length; ++i) {
        allValuesToFrequency.set(input[i], allValuesToFrequency.getOrDefault(input[i], 0) + 1);
        allValuesToFrequency.set(forbidden[i], allValuesToFrequency.getOrDefault(forbidden[i], 0) + 1);
    }

    for (let frequency of allValuesToFrequency.values()) {
        if (frequency > input.length) {
            return false;
        }
    }
    return true;
}

function calculateMinSwaps(input: number[], forbidden: number[]): number {
    let totalFrequencyOfSwapValues = 0;
    let maxFrequencyOfSingleSwapValue = 0;
    const swapValuesToFrequency = new CustomizedMap<number, number>();

    for (let i = 0; i < input.length; ++i) {
        if (input[i] === forbidden[i]) {
            swapValuesToFrequency.set(input[i], swapValuesToFrequency.getOrDefault(input[i], 0) + 1);

            ++totalFrequencyOfSwapValues;
            maxFrequencyOfSingleSwapValue = Math.max(maxFrequencyOfSingleSwapValue, swapValuesToFrequency.get(input[i]));
        }
    }
    return Math.max(Math.floor((totalFrequencyOfSwapValues + 1) / 2), maxFrequencyOfSingleSwapValue);
}

class CustomizedMap<Key, Value> extends Map {

    constructor() {
        super();
    }

    getOrDefault(key: Key, defaultValue: Value) {
        if (this.has(key)) {
            return this.get(key);
        }
        return defaultValue;
    }
}
