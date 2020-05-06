
interface DailyCatStat {
    total: number;
    china: number;
    outsideChina: number;
}

export interface ICovidStatDaily {
    confirmed: DailyCatStat;
    deltaConfirmedDetail: DailyCatStat;
    deaths: DailyCatStat;
    recovered: DailyCatStat;
    reportDate: string;
}

export interface CountryCatStat {
    value: number;
    detail: string;
}

export interface ICovidStatCountry {
    confirmed: CountryCatStat;
    recovered: CountryCatStat;
    deaths: CountryCatStat;
    lastUpdate: string;
}