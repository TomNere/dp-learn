import { ISimpleObjectParameter } from 'src/statsHelpers/CoinsStatsHelper';

export const recursiveSubstring = (strX: string, strY: string, length1: number, length2: number, result: number, calls: ISimpleObjectParameter) => {
    ++calls.value;

    if (length1 === 0 || length2 === 0) {
        return result;
    }

    if (strX[length1 - 1] === strY[length2 - 1]) {
        result = recursiveSubstring(strX, strY, length1 - 1, length2 - 1, result + 1, calls);
    }

    result = Math.max(result, Math.max(recursiveSubstring(strX, strY, length1, length2 - 1, 0, calls), recursiveSubstring(strX, strY, length1 - 1, length2, 0, calls)));

    return result;
}

export const dpSubstring = (strX: string, strY: string, length1: number, length2: number, calls: ISimpleObjectParameter) => {
    const table: number[][] = [];

    for (let i = 0; i < length1; i++) {
        table[i] = [];
        for (let j = 0; j < length2; j++) {
            ++calls.value;
            if (strX[i] === strY[j]) {
                if (i === 0 || i === 0) {
                    table[i][j] = 1;
                }
                else {
                    table[i][j] = table[i - 1][j - 1] + 1;
                }
            }
            else {
                table[i][j] = 0;
            }
        }
    }
}

export const recSubstringTime = (length1: number, length2: number) => {
    return Math.pow(3, length1 + length2 - 1);
}

export const dpSubstringTime = (length1: number, length2: number) => {
    return length1 * length2;
}

export const recSubstringSpace = (length1: number, length2: number) => {
    return length1 + length2  // Store only strings
}

export const dpSubstringSpace = (length1: number, length2: number) => {
    return length1 + length2 + (length1 * length2);     // strings, table and result
}

export const substringExamples = [
    {
        strX: '',
        strY: '',
        recTime: 1,
        dpTime: 0,
    },
    {
        strX: 'aaaaa',
        strY: '',
        recTime: 1,
        dpTime: 0,
    },
    {
        strX: 'aaaaa',
        strY: 'bbbbb',
        recTime: 503,
        dpTime: 25,
    },
    {
        strX: 'aaaaa',
        strY: 'aaaaa',
        recTime: 2524,
        dpTime: 25,
    },
    {
        strX: 'test',
        strY: 'twoTests',
        recTime: 1735,
        dpTime: 32,
    },
];
