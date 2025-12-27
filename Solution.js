
/**
 * @param {number[]} input
 * @param {number[]} forbidden
 * @return {number}
 */
var minSwaps = function (input, forbidden) {
    const NOT_POSSIBLE = -1;
    if (!isPossibleToPairEachInputValueWithDifferentForbiddenValue(input, forbidden)) {
        return NOT_POSSIBLE;
    }
    return calculateMinSwaps(input, forbidden);
};

/**
 * @param {number[]} input
 * @param {number[]} forbidden
 * @return {boolean}
 */
function isPossibleToPairEachInputValueWithDifferentForbiddenValue(input, forbidden) {
    const allValuesToFrequency = new CustomizedMap();

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

/**
 * @param {number[]} input
 * @param {number[]} forbidden
 * @return {number}
 */
function calculateMinSwaps(input, forbidden) {
    let totalFrequencyOfSwapValues = 0;
    let maxFrequencyOfSingleSwapValue = 0;
    const swapValuesToFrequency = new CustomizedMap();

    for (let i = 0; i < input.length; ++i) {
        if (input[i] === forbidden[i]) {
            swapValuesToFrequency.set(input[i], swapValuesToFrequency.getOrDefault(input[i], 0) + 1);

            ++totalFrequencyOfSwapValues;
            maxFrequencyOfSingleSwapValue = Math.max(maxFrequencyOfSingleSwapValue, swapValuesToFrequency.get(input[i]));
        }
    }
    return Math.max(Math.floor((totalFrequencyOfSwapValues + 1) / 2), maxFrequencyOfSingleSwapValue);
}

class CustomizedMap extends Map {

    constructor() {
        super();
    }

    getOrDefault(key, defaultValue) {
        if (this.has(key)) {
            return this.get(key);
        }
        return defaultValue;
    }
}
