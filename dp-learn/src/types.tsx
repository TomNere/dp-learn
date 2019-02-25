// Helper for passing methods parameters by reference
export interface ISimpleObjectParameter {
    value: number
}

// Converter between time units
export type ITimeConverter = (n: number) => number;
