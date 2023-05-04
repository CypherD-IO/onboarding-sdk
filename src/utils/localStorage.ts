import { EXPIRATION_KEY, ONGOING_BRIDGE_KEY, ONONGOING_BRIDGE_DATA } from "../constants/server";

export const checkExpiry = () => {
  const expiry = localStorage.getItem(EXPIRATION_KEY);
  if (expiry && new Date().getTime() >= parseInt(expiry)) {
    localStorage.removeItem(ONGOING_BRIDGE_KEY);
    localStorage.removeItem(ONONGOING_BRIDGE_DATA);
    localStorage.removeItem(EXPIRATION_KEY);
  }
}
