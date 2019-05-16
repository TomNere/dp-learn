// author: Tomáš Nereča, 2019

// Codes are inspirated by https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/

// Helper for passing methods parameters by reference
export interface ISimpleObjectParameter {
    value: number
}

export const recursiveCoins = (coins: number[], arrSize: number, value: number,  calls: ISimpleObjectParameter) => {
    ++calls.value;

    if (value === 0) {
        return 0;
    }

    let result = Number.MAX_VALUE;

    for (let i = 0; i < arrSize; i++) {
        if (coins[i] <= value) {
            const subResult = recursiveCoins(coins, arrSize, value - coins[i], calls);

            if (subResult !== Number.MAX_VALUE && subResult + 1 < result) {
                result = subResult + 1;
            }
        }
    }

    return result;
};

export const dpCoins = (coins: number[], arrSize: number, value: number, calls: ISimpleObjectParameter ) => {
    const table: number[] = [];
  
    table[0] = 0;
    calls.value = 0;

    for (let i = 1; i <= value; i++) {
        table[i] = Number.MAX_VALUE;
        for (let j = 0; j < arrSize; j++) {
            if (coins[j] <= i) {
                calls.value++;
                const subResult = table[i - coins[j]];
                if (subResult !== Number.MAX_VALUE && subResult + 1 < table[i]) {
                    table[i] = subResult + 1;
                }
            }
        }
    }

    return table[value];
};

export const recCoinsTime = (value: number) => {
    return Math.pow(2, value);
}

export const dpCoinsTime = (arrSize: number, value: number) => {
    return arrSize * value;
}

export const recCoinsSpace = (arrSize: number) => {
    return arrSize + 1;     // Store coins and given value
}

export const dpCoinsSpace = (arrSize: number) => {
    return arrSize + 1 + arrSize + 1;   // Store coins, given value, coins array for DP (size is coins number +1)
}

export const coinsExamples = [
    {
        coins: [1],
        value: 0,
        recTime: 1,
        dpTime: 0,
    },
    {
        coins: [1,2,3,4,5,6,7,8],
        value: 8,
        recTime: 256,
        dpTime: 36,
    },
    {
        coins: [4,6,8],
        value: 12,
        recTime: 11,
        dpTime: 21,
    },
    {
        coins: [7,4,8],
        value: 10,
        recTime: 5,
        dpTime: 14,
    },
];
