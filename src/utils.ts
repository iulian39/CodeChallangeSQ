import { rateObject } from "easy-currencies/dist/converter";
import {
  Asset,
  AssetKeys,
  Customer,
  CustomerKeys,
  Portfolio,
  RestrictionStatus,
} from "./interfaces";

export const getAggregatedRestrictionStatus = (portofolios: Portfolio[]) => {
  let cleanCount = 0;
  let breachedCount = 0;

  portofolios.forEach((el) => {
    if (el.restrictionStatus === RestrictionStatus.CLEAN) {
      cleanCount += 1;
    } else {
      breachedCount += 1;
    }
  });

  return (
    RestrictionStatus.CLEAN +
    " " +
    cleanCount +
    "\n" +
    RestrictionStatus.BREACHED +
    " " +
    breachedCount
  );
};

// Asset Associated Risk === quantity * associatedRiskPerAsset
export const getAssetAssociatedRisk = (
  quantity: number,
  associatedRiskPerAsset: number
) => quantity * associatedRiskPerAsset;

// Asset Capital Gain === quantity * capitalGainPerAsset
export const getAssetCapitalGain = (
  quantity: number,
  capitalGainPerAsset: string
) => quantity * parseInt(capitalGainPerAsset);

// Asset Total Value === (quantity * valuePerAsset) + asset capital gain
export const getAssetTotalValue = (
  quantity: number,
  valuePerAsset: number,
  capitalGainPerAsset: string
) => quantity * valuePerAsset + parseInt(capitalGainPerAsset);

// Portfolio Associated Risk === sum of all assets’ associated risks
export const getPortofolioAssociatedRisk = (list: Asset[]) =>
  list.reduce((partialSum, el) => partialSum + el.associatedRiskPerAsset, 0);

// Portfolio Capital Gain === sum of all assets’ capital gains
export const getPortofolioCapitalGain = (list: Asset[]) =>
  list.reduce(
    (partialSum, el) => partialSum + parseInt(el.capitalGainPerAsset),
    0
  );

// Portfolio Total Value === portfolio capital gain + sum of all assets’ total value
export const getPortofolioTotalValue = (portofolio: Portfolio, rates: rateObject) =>
  getPortofolioCapitalGain(portofolio.assets) +
  portofolio.assets.reduce(
    (partialSum, el) =>
      partialSum +
      getAssetTotalValue(
        el.quantity,
        el.valuePerAsset,
        el.capitalGainPerAsset
      ) /
        rates[el.currency],
    0
  );

// Customer Aggregated Net Worth === sum of all portfolios’ total values
export const getCustomerAggregatedNW = (portofolios: Portfolio[], rates: rateObject) =>
  portofolios.reduce(
    (partialSum, el) => partialSum + getPortofolioTotalValue(el, rates),
    0
  );

// Customer Aggregated Capital Gain === sum of all portfolios’ capital gain
export const getCustomerAggregatedCapitalGain = (portofolios: Portfolio[]) =>
  portofolios.reduce(
    (partialSum, el) => partialSum + getPortofolioCapitalGain(el.assets),
    0
  );

export const sortAssetData = ({
  input,
  data,
  orderBy,
  reverse,
}: {
  input: string;
  data: Asset[];
  orderBy: AssetKeys;
  reverse: boolean;
}) => {
  if (!orderBy) return data;

  const sortedData = data
    .filter((el) => el.assetName.includes(input))
    .sort((a, b) => {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
};

export const sortCustomerData = ({
  input,
  data,
  orderBy,
  reverse,
}: {
  input: string;
  data: Customer[];
  orderBy: CustomerKeys;
  reverse: boolean;
}) => {
  if (!orderBy) return data;

  const sortedData = data
    .filter((el) => el.name?.includes(input))
    .sort((a, b) => {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    });

  if (reverse) {
    return sortedData.reverse();
  }

  return sortedData;
};
