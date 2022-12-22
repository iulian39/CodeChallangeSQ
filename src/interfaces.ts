export interface Customer {
    clientId:                     string;
    firstName:                    string;
    lastName:                     string;
    annualIncome:                 number;
    riskProfile:                  number;
    residence:                    string;
    currency:                     string;
    clientType:                   string;
    portfolios:                   Portfolio[];
    name?:                        string;
    aggregatedNetWorth?:          number;
    aggregatedRestrictionStatus?: string;
    aggregatedCapitalGain?:       number;
}

export enum Currency {
    Chf = "CHF",
    Eur = "EUR",
    Gbp = "GBP",
    Usd = "USD",
}

export interface Portfolio {
    portfolioId:       string;
    portfolioName:     string;
    restrictionStatus: RestrictionStatus;
    assets:            Asset[];
}

export enum RestrictionStatus {
    CLEAN = "clean",
    BREACHED = "breached"
}

export interface Asset {
    isin:                   string;
    assetType:              string;
    assetName:              string;
    location:               string;
    quantity:               number;
    currency:               string;
    valuePerAsset:          number;
    capitalGainPerAsset:    string;
    associatedRiskPerAsset: number;
    total_value?:           number;
    total_capital_gain?:    number;
    associatedAssetRisk?:   number;
}

export type AssetKeys = keyof Asset;
export type CustomerKeys = keyof Customer;

export enum SortDirection {
    ASC = "asc",
    DESC= "desc"
}

export interface CustomerTableHeaders { key: CustomerKeys; label: string }
export interface AssetTableHeaders { key: AssetKeys; label: string }