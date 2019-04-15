import { ISimpleObjectParameter } from 'src/helpers/TypesDefinitions';

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

export const dpSubstringTime = (length1: number, length2: number) => {
    return length1 * length2;
}

export const recSubstringTime = (length1: number, length2: number) => {
    // TODO
    return 0;
}

export const recSubstringSpace = (length1: number, length2: number) => {
    return length1 + length2  // Store only strings
}

export const dpSubstringSpace = (length1: number, length2: number) => {
    return length1 + length2 + (length1 * length2) + 1;     // strings, table and result
}

export const substringExamples = [
    {
        strX: 'aaaaa',
        strY: 'bbbbb'
    },
    {
        strX: 'someString',
        strY: 'anotherstring'
    },
    {
        strX: 'UPPERCASE',
        strY: 'onlypartUPPERcase'
    },
    {
        strX: '123here123',
        strY: '12345hereIGo12345'
    },
];
