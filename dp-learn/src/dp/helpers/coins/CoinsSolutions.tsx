import { ISimpleObjectParameter } from 'src/helpers/TypesDefinitions';

export type ISolutionCoins = (coins: number[], arrSize: number, value: number, calls: ISimpleObjectParameter) => number;

export const recursiveCoins : ISolutionCoins = (coins: number[], arrSize: number, value: number,  calls: ISimpleObjectParameter) => {
    ++calls.value;

    // Base case
    if (value === 0) {
        return 0;
    }

    // Initialize result
    let res = Number.MAX_VALUE;

    // Loop trough all coins smaller or equal to given value
    for (let i = 0; i < arrSize; i++) {
        if (coins[i] <= value) {
            const subRes = recursiveCoins(coins, arrSize, value - coins[i], calls);

            // Check for INT_MAX to avoid overflow and see 
            // if result can be minimized
            if (subRes !== Number.MAX_VALUE && subRes + 1 < res) {
                res = subRes + 1;
            }
        }
    }

    return res;
};

// Returns number of cycles
export const dpCoins : ISolutionCoins = (coins: number[], arrSize: number, value: number, calls: ISimpleObjectParameter ) => {
    // Array[i] will be storing the minimum number of coins
    // required for i value. So array[value] will have result
    const array: number[] = [];
  
    // Base case (If given value value is 0)
    array[0] = 0;
    calls.value = 0;

    // Initialize all array values as INT_MAX
    for (let i = 1; i <= value; i++) {
        array[i] = Number.MAX_VALUE; // INT_MAX is from limits.h
    }

    // Compute minimum coins required for all
    // values from 1 to value
    for (let i = 1; i <= value; i++) {
        // Go through all coins smaller than i
        for (let j = 0; j < arrSize; j++) {
            calls.value++;
            if (coins[j] <= i) {
                const subRes = array[i - coins[j]];
                if (subRes !== Number.MAX_VALUE && subRes + 1 < array[i]) {
                    array[i] = subRes + 1;
                }
            }
        }
    }

    return array[value];
};

export type ICoinsSpace = (coinsLength: number, value?: number) => number;

export const recCoinsTime = (coinsLength: number) => {
    // TODO right formula
    return coinsLength * coinsLength;
}

export const recCoinsSpace : ICoinsSpace = (coinsLength: number) => {
    return coinsLength + 1; // Store coins and given value
}

export const dpCoinsSpace : ICoinsSpace = (coinsLength: number, value: number) => {
    return coinsLength + (value + 1) + 1;    // Store coins, coins array for DP (size is coins number +1), +1 to store given value
}
