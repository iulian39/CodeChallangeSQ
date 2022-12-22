import { render, screen } from "@testing-library/react";
import App from "./App";

test("Should render app correctly", async () => {
  render(<App />);
  expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Risk profile/i)).toBeInTheDocument();
  expect(screen.getByText(/Aggregated net worth/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Aggregated restriction status/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Aggregated capital gain/i)).toBeInTheDocument();
  await screen.findByText(/Sandra Schneider/i);
  await screen.findByText(/Ivan Lenzi/i);
});
