import _ from "lodash";
import { maximizeWindow, minimizeWindow } from "../utils";
import { bridgeSubmitConditionCheck, closePopup, continueToPortfolio, navigateAfterSwitch, onBridgeClick, onMax, openChat, switchTheme, triggerBridgePopup } from "./handlerFunctions";

declare let globalThis: any;

export const clickHandler = (event: any) => {
  const classList = event.target.classList;
  if (classList.contains("close-popup")) {
    let params = event.target.getAttribute('params');
    params = JSON.parse(params);
    const triggerCallback = _.get(params, "triggerCallback");
    triggerCallback ? closePopup(true) : closePopup(false);
  } if (classList.contains("back-button")) {
    globalThis.previousPage();
  } if (classList.contains("toggle-input")) {
    switchTheme();
  } if (classList.contains("chat-support")) {
    openChat();
  } if (classList.contains("info-screen-continue")) {
    continueToPortfolio();
  } if (classList.contains("exchange-token-button")) {
    triggerBridgePopup();
  } if (classList.contains("bp-max-button")) {
    onMax();
  } if (classList.contains("bridge-submit-blue-button")) {
    onBridgeClick();
  } if (classList.contains("bridge-input-submit")) {
    bridgeSubmitConditionCheck();
  } if (classList.contains("bridge-loading-container")) {
    maximizeWindow();
  } if (classList.contains("minimize-button")) {
    minimizeWindow();
  } if (classList.contains("switch-chain-button")) {
    let params = event.target.getAttribute('params');
    params = JSON.parse(params);
    const chainId = _.get(params, "chainId");
    navigateAfterSwitch(chainId);
  }
}
