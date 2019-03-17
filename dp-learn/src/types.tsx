// Helper for passing methods parameters by reference
export interface ISimpleObjectParameter {
    value: number
}

// Converter between time units
export type ITimeConverter = (n: number) => number;

export interface ITimeChartData {
    name: string,
    recTheoretical: number,
    rec: number,
    dp: number,
}

export interface ISpaceChartData {
    name: string,
    rec: number,
    dp: number,
}

export interface IStatsTableData {
    name: string,
    recTheorTime: number,
    recTime: number,
    dpTime: number,
    dpSpace: number,
    recSpace: number
}
