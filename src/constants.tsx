import { AssetTableHeaders, CustomerTableHeaders } from "./interfaces";

export const customerTableHeaders: CustomerTableHeaders[] = [
  { key: "name", label: "Customer Name" },
  { key: "riskProfile", label: "Risk profile" },
  {
    key: "aggregatedNetWorth",
    label: "Aggregated net worth",
  },
  {
    key: "aggregatedRestrictionStatus",
    label: "Aggregated restriction status",
  },
  {
    key: "aggregatedCapitalGain",
    label: "Aggregated capital gain",
  },
];

export const assetTableHeaders: AssetTableHeaders[] = [
  { key: "assetName", label: "Asset name" },
  { key: "assetType", label: "Asset type" },
  {
    key: "location",
    label: "Location",
  },
  {
    key: "quantity",
    label: "Quantity",
  },
  {
    key: "total_value",
    label: "Total Value",
  },
  {
    key: "total_capital_gain",
    label: "Capital Gain",
  },
  {
    key: "associatedAssetRisk",
    label: "Associated Risk",
  },
];
