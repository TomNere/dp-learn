
export type ITimeConverter = (n: number) => number;

export const milliToMicro : ITimeConverter = (n: number) => {
    return n * 1000;
}

export const milliToMilli : ITimeConverter = (n: number) => {
    return n;
}
