import { ISimpleObjectParameter } from 'src/statsHelpers/CoinsStatsHelper';

export const recursiveRod = (prices: number[], arrSize: number, calls: ISimpleObjectParameter) => {
    ++calls.value;

    if (arrSize === 0) {
        return 0; 
    }

    let result = Number.MIN_VALUE;
  
    for (let i = 0; i < arrSize; i++) {
        result = Math.max(result, prices[i] + recursiveRod(prices, arrSize - i - 1, calls)); 
    }
  
    return result;
}

export const dpRod = (prices: number[], arrSize: number, calls: ISimpleObjectParameter) => {
    const table: number[] = [];
    table[0] = 0;
    calls.value = 0;

    for (let i = 1; i <= arrSize; i++) {
        let maxVal = Number.MIN_VALUE;
        
        for (let j = 0; j < i; j++) {
            calls.value++;
            maxVal = Math.max(maxVal, prices[j] + table[i - j - 1]);
        }
        table[i] = maxVal; 
    }

    return table[arrSize];
}

export const recRodTime = (arrSize: number) => {
    return Math.pow(2, arrSize);
}

export const dpRodTime = (arrSize: number) => {
    return arrSize * arrSize;
}

export const recRodSpace = (arrSize: number) => {
    return arrSize;     // Store only prices
}

export const dpRodSpace = (arrSize: number) => {
    return arrSize + arrSize + 1;     // Store prices and array for DP solution
}

export const rodExamples = [
    {
        prices: [1],
        recTime: 2,
        dpTime: 1,
    },
    {
        prices: [1,2,3,4],
        recTime: 16,
        dpTime: 10,
    },
    {
        prices: [1,2,3,4,5,6,7,8,9,10],
        recTime: 1024,
        dpTime: 55,
    },
    {
        prices: [10,9,8,7,6,5,4,3,2,1],
        recTime: 1024,
        dpTime: 55,
    },
];
