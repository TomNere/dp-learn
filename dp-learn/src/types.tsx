// Helper for passing methods parameters by reference
export interface ISimpleObjectParameter {
    value: number
}

// Converter between time units
export type ITimeConverter = (n: number) => number;

export interface IChartData {
    name: string,
    rec: number,
    dp: number,
}

export interface IStatsTableData {
    name: string,
    dpTime: number,
    recTime: number,
    dpSpace: number,
    recSpace: number
}
