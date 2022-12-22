import { createContext, useEffect, useMemo, useState } from "react";
import data from "./data.json";
import "./App.css";
import CustomerSelection from "./components/CustomerSelection";
import { Customer } from "./interfaces";
import {
  getCustomerAggregatedNW,
  getAggregatedRestrictionStatus,
  getCustomerAggregatedCapitalGain,
  getAssetTotalValue,
  getAssetCapitalGain,
  getAssetAssociatedRisk,
} from "./utils";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [mode, setMode] = useState<"light" | "dark">(
    prefersDarkMode ? "dark" : "light"
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  useEffect(() => {
    console.log('aaaa')
    const customerDataCopy = [...data as Customer[]];
    customerDataCopy.forEach((el) => {
      el.name = el.firstName + " " + el.lastName;
      el.aggregatedNetWorth = getCustomerAggregatedNW(el.portfolios);
      el.aggregatedRestrictionStatus = getAggregatedRestrictionStatus(
        el.portfolios
      );
      el.aggregatedCapitalGain = getCustomerAggregatedCapitalGain(
        el.portfolios
      );
      el.portfolios.forEach((portfolios) => {
        portfolios.assets.forEach((asset) => {
          asset.total_value = getAssetTotalValue(
            asset.quantity,
            asset.valuePerAsset,
            asset.capitalGainPerAsset
          );
          asset.total_capital_gain = getAssetCapitalGain(
            asset.quantity,
            asset.capitalGainPerAsset
          );
          asset.associatedAssetRisk = getAssetAssociatedRisk(
            asset.quantity,
            asset.associatedRiskPerAsset
          );
        });
      });
    });
    setCustomerData(customerDataCopy);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CustomerSelection data={customerData} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
