import { render, screen } from "@testing-library/react";
import App from "./App";

const rates = { EUR: 1, USD: 1.05, GBP: 0.9, CHF: 0.99 };
jest.mock("../src/currencyConverter.ts").fn().mockReturnValue(rates);

test("Should render app correctly", async () => {
  render(<App />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  await screen.findByText(/Sandra Schneider/i);
  await screen.findByText(/Customer Name/i);
  await screen.findByText(/Risk profile/i);
  await screen.findByText(/Aggregated net worth/i);
  await screen.findByText(/Aggregated capital gain/i);
  await screen.findByText(/Sandra Schneider/i);
  await screen.findByText(/Ivan Lenzi/i);
});
