import { Convert } from "easy-currencies";

export const fetchCurrency = async () => {
  const convert = await Convert().from("EUR").fetch();
  return convert.rates;
};
