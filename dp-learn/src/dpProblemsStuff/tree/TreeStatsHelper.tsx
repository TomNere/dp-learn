import { FreqArraySum } from 'src/helpers/Helpers';
import { ISimpleObjectParameter } from 'src/types';

export const recursiveTree = (freqs: number[], i: number, j: number, calls: ISimpleObjectParameter) => {
    ++calls.value;

    // Base cases 
    if (j < i) {     // no elements in this subarray 
        return 0;
    }

    if (j === i) {    // one element in this subarray 
        return freqs[i];
    }

    // Get sum of freq[i], freq[i+1], ... freq[j] 
    const fsum = FreqArraySum(freqs, i, j);

    // Initialize minimum value 
    let min = Number.MAX_VALUE;

    // One by one consider all elements as root and 
    // recursively find cost of the BST, compare the 
    // cost with min and update min if needed 
    for (let r = i; r <= j; ++r) {
        const cost = recursiveTree(freqs, i, r - 1, calls) +
            recursiveTree(freqs, r + 1, j, calls);
        if (cost < min) {
            min = cost;
        }
    }

    // Return minimum value 
    return min + fsum;
}

export const dpTree = (freqs: number[], calls: ISimpleObjectParameter) => {
    /* Create an auxiliary 2D matrix to store results  
        of subproblems */
    const table: number[][] = [];
    const LENGTH = freqs.length;

    /* table[i][j] = Optimal cost of binary search tree 
       that can be  formed from keys[i] to keys[j]. 
       table[0][n-1] will store the resultant table */

    // For a single key, cost is equal to frequency of the key 
    for (let i = 0; i < LENGTH; i++) {
        table[i] = []
        table[i][i] = freqs[i];
    }

    // Now we need to consider chains of length 2, 3, ... . 
    // L is chain length. 
    for (let outerCounter = 2; outerCounter <= LENGTH; outerCounter++) {
        // i is row number in table[][] 
        for (let innerCounter = 0; innerCounter <= LENGTH - outerCounter; innerCounter++) {
            // Get column number j from row number i and  
            // chain length L

            const columnNumber = innerCounter + outerCounter - 1;
            table[innerCounter][columnNumber] = Number.MAX_VALUE;

            // Try making all keys in interval keys[i..j] as root 
            for (let rootCounter = innerCounter; rootCounter <= columnNumber; rootCounter++) {
                ++calls.value;

                // c = cost when keys[r] becomes root of this subtree 
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

export type ITreeSpace = (arrSize: number) => number;

export const recTreeTime = (arrSize: number) => {
    // TODO right forumla
    return arrSize * arrSize;
}

export const recTreeSpace: ITreeSpace = (arrSize: number) => {
    return arrSize * 2;     // Store only prices
}

export const dpTreeSpace: ITreeSpace = (arrSize: number) => {
    return (arrSize * 4);     // Store prices and array for DP solution
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
