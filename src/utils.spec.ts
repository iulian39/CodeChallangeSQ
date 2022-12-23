import { Customer, RestrictionStatus } from "./interfaces";
import {
  getAssetAssociatedRisk,
  getAssetCapitalGain,
  getAssetTotalValue,
  getCustomerAggregatedCapitalGain,
  getCustomerAggregatedNW,
  getPortofolioAssociatedRisk,
  getPortofolioCapitalGain,
  getPortofolioTotalValue,
} from "./utils";
const demoData: Customer = {
  clientId: "clientId",
  firstName: "firstName",
  lastName: "lastName",
  annualIncome: 14500000,
  riskProfile: 3,
  residence: "Switzerland",
  currency: "CHF",
  clientType: "retail",
  portfolios: [
    {
      portfolioId: "cli18874_por1",
      portfolioName: "portfolio 1",
      restrictionStatus: RestrictionStatus.CLEAN,
      assets: [
        {
          isin: "US0024812085",
          assetType: "equity",
          assetName: "A+D PHARMA HOL.GDR REGS",
          location: "US",
          quantity: 200,
          currency: "USD",
          valuePerAsset: 140000,
          capitalGainPerAsset: "6880",
          associatedRiskPerAsset: 39000,
        },
        {
          isin: "DE0005239701",
          assetType: "equity",
          assetName: "BÖWE SYSTEC AG",
          location: "DE",
          quantity: 320,
          currency: "EUR",
          valuePerAsset: 67010,
          capitalGainPerAsset: "1490",
          associatedRiskPerAsset: 24500,
        },
      ],
    },
    {
      portfolioId: "cli111098_por2",
      portfolioName: "portfolio 2",
      restrictionStatus: RestrictionStatus.BREACHED,
      assets: [
        {
          isin: "US50162D1000",
          assetType: "equity",
          assetName: "L+L ENERGY INC. DL-,001",
          location: "US",
          quantity: 230,
          currency: "USD",
          valuePerAsset: 117000,
          capitalGainPerAsset: "14500",
          associatedRiskPerAsset: 4300,
        },
        {
          isin: "DE000AK0E1V3",
          assetType: "equity",
          assetName: "DZ Bank AG",
          location: "DE",
          quantity: 500,
          currency: "EUR",
          valuePerAsset: 29800,
          capitalGainPerAsset: "8700",
          associatedRiskPerAsset: 4100,
        },
      ],
    },
  ],
};
const firstAsset = demoData.portfolios[0].assets[0];
const rates = { EUR: 1, USD: 1.05, GBP: 0.9, CHF: 0.99 };

describe("finance functions", () => {
  it("should test getAssetAssociatedRisk", () => {
    expect(
      getAssetAssociatedRisk(
        firstAsset.quantity,
        firstAsset.associatedRiskPerAsset
      )
    ).toEqual(7800000);
  });

  it("should test getAssetCapitalGain", () => {
    expect(
      getAssetCapitalGain(firstAsset.quantity, firstAsset.capitalGainPerAsset)
    ).toEqual(1376000);
  });

  // Asset Total Value === (quantity * valuePerAsset) + asset capital gain
  it("should test getAssetTotalValue", () => {
    expect(
      getAssetTotalValue(
        firstAsset.quantity,
        firstAsset.valuePerAsset,
        firstAsset.capitalGainPerAsset
      )
    ).toEqual(29376000);
  });

  // Portfolio Associated Risk === sum of all assets’ associated risks
  it("should test getPortofolioAssociatedRisk", () => {
    expect(getPortofolioAssociatedRisk(demoData.portfolios[0].assets)).toEqual(
      15640000
    );
    expect(getPortofolioAssociatedRisk(demoData.portfolios[1].assets)).toEqual(
      3039000
    );
  });

  // Portfolio Capital Gain === sum of all assets’ capital gains
  it("should test getPortofolioCapitalGain", () => {
    expect(
      getPortofolioCapitalGain(demoData.portfolios[0].assets, rates)
    ).toEqual(1787276.1904761905);
    expect(
      getPortofolioCapitalGain(demoData.portfolios[1].assets, rates)
    ).toEqual(7526190.476190476);
  });

  // Portfolio Total Value === portfolio capital gain + sum of all assets’ total value
  it("should test getPortofolioTotalValue", () => {
    expect(getPortofolioTotalValue(demoData.portfolios[0], rates)).toEqual(
      51684419.047619045
    );
    expect(getPortofolioTotalValue(demoData.portfolios[1], rates)).toEqual(
      55580952.38095238
    );
  });

  // Customer Aggregated Net Worth === sum of all portfolios’ total values
  it("should test getCustomerAggregatedNW", () => {
    expect(getCustomerAggregatedNW(demoData.portfolios, rates)).toEqual(
      107265371.42857143
    );
  });

  // Customer Aggregated Capital Gain === sum of all portfolios’ capital gain
  it("should test getCustomerAggregatedCapitalGain", () => {
    expect(
      getCustomerAggregatedCapitalGain(demoData.portfolios, rates)
    ).toEqual(9313466.666666666);
  });
});
