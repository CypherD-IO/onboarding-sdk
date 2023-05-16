import { updateUsdValue } from "../utils";

export const inputHandler = (event: any) => {
  const target = event.target;
  if (target.id === "bp-amount-value") {
    updateUsdValue(event);
  }
}
