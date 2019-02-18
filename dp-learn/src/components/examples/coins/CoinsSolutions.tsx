export const recursiveCoins = (coins: number[], arrSize: number, value: number) => {
    // Base case
    if (value === 0) {
        return 0;
    }

    // Initialize result
    let res = Number.MAX_VALUE;

    // Loop trough all coins smaller or equal to given value
    for (let i = 0; i < arrSize; i++) {
        if (coins[i] <= value) {
            const subRes = recursiveCoins(coins, arrSize, value - coins[i]);

            // Check for INT_MAX to avoid overflow and see 
            // if result can be minimized
            if (subRes !== Number.MAX_VALUE && subRes + 1 < res) {
                res = subRes + 1;
            }
        }
    }

    return res;
};

export const dpCoins = (coins: number[], arrSize: number, value: number) => {
    // Array[i] will be storing the minimum number of coins
    // required for i value. So array[value] will have result
    const array: number[] = [];
  
    // Base case (If given value value is 0)
    array[0] = 0;
  
    // Initialize all array values as INT_MAX
    for (let i = 1; i <= value; i++) {
        array[i] = Number.MAX_VALUE; // INT_MAX is from limits.h
    }
  
    // Compute minimum coins required for all
    // values from 1 to value
    for (let i = 1; i <= value; i++) {
        // Go through all coins smaller than i
        for (let j = 0; j < arrSize; j++) {
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

export type coinsSolCallback = (coins: number[], arrSize: number, value: number) => number;

export const recSpace = (coinsLength: number, value: number) => {
    return coinsLength + 1; // Store coins and given value
}

export const dpSpace = (coinsLength: number, value: number) => {
    return coinsLength + (value + 1) + 1;    // Store coins, coins array for DP (size is coins number +1), +1 to store given value
}
