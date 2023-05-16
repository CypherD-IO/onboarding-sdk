import { EXPIRATION_DURATION, EXPIRATION_KEY, ONONGOING_BRIDGE_DATA } from "../constants/server";

export const checkExpiry = () => {
  const expiry = localStorage.getItem(EXPIRATION_KEY);
  if (expiry && new Date().getTime() >= parseInt(expiry)) {
    localStorage.removeItem(ONONGOING_BRIDGE_DATA);
    localStorage.removeItem(EXPIRATION_KEY);
  }
}

export const setLocalStorageExpiry = () => {
  const expiry = new Date().getTime() + EXPIRATION_DURATION;
  localStorage.setItem(EXPIRATION_KEY, expiry.toString());
}
