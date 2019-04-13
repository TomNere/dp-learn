import { FreqArraySum } from 'src/helpers/Helpers';
import { ISimpleObjectParameter } from 'src/helpers/TypesDefinitions';

export const recursiveTree = (freqs: number[], i: number, j: number, calls: ISimpleObjectParameter) => {
    ++calls.value;

    if (j < i) {
        return 0;
    }

    if (j === i) {
        return freqs[i];
    }

    const fsum = FreqArraySum(freqs, i, j);

    let min = Number.MAX_VALUE;

    for (let r = i; r <= j; ++r) {
        const cost = recursiveTree(freqs, i, r - 1, calls) + recursiveTree(freqs, r + 1, j, calls);
        if (cost < min) {
            min = cost;
        }
    }

    return min + fsum;
}

export const dpTree = (freqs: number[], calls: ISimpleObjectParameter) => {
    const table: number[][] = [];
    const LENGTH = freqs.length;

    for (let i = 0; i < LENGTH; i++) {
        table[i] = []
        table[i][i] = freqs[i];
    }

    for (let outerCounter = 2; outerCounter <= LENGTH; outerCounter++) {
        for (let innerCounter = 0; innerCounter <= LENGTH - outerCounter; innerCounter++) {
            const columnNumber = innerCounter + outerCounter - 1;
            table[innerCounter][columnNumber] = Number.MAX_VALUE;

            for (let rootCounter = innerCounter; rootCounter <= columnNumber; rootCounter++) {
                ++calls.value;

                const val = ((rootCounter > innerCounter) ? table[innerCounter][rootCounter - 1] : 0) +
                    ((rootCounter < columnNumber) ? table[rootCounter + 1][columnNumber] : 0) +
                    FreqArraySum(freqs, innerCounter, columnNumber);

                if (val < table[innerCounter][columnNumber]) {
                    table[innerCounter][columnNumber] = val;
                }
            }
        }
    }

    return table[0][LENGTH - 1];
}

export const dpTreeTime = (arrSize: number) => {
    // TODO right forumla
    return arrSize * arrSize;
}

export const recTreeTime = (arrSize: number) => {
    // TODO right forumla
    return arrSize * arrSize;
}

export const recTreeSpace = (arrSize: number) => {
    return arrSize;     // Store only freqs
}

export const dpTreeSpace = (arrSize: number) => {
    return arrSize + (arrSize * 2);     // freqs and table
}

export const treeExamples = [
    {
        freqs: [1, 2, 3, 4],
    },
    {
        freqs: [2, 3, 4, 4, 6],
    },
    {
        freqs: [3, 5, 6, 7, 9, 11, 12],
    },
];
