import _ from "lodash";
import { maximizeWindow, minimizeWindow } from ".";
import { bridgeSubmitConditionCheck, closePopup, continueToPortfolio, navigateAfterSwitch, onBridgeClick, onMax, openChat, switchTheme, triggerBridgePopup } from "./handlerFunctions";

declare let globalThis: any;

export const clickHandler = (event: any) => {
  if (event.target.classList.contains("close-popup")) {
    let params = event.target.getAttribute('params');
    params = JSON.parse(params);
    const triggerCallback = _.get(params, "triggerCallback");
    triggerCallback ? closePopup(true) : closePopup(false);
  } if (event.target.classList.contains("back-button")) {
    globalThis.previousPage();
  } if (event.target.classList.contains("toggle-input")) {
    switchTheme();
  } if (event.target.classList.contains("chat-support")) {
    openChat();
  } if (event.target.classList.contains("info-screen-continue")) {
    continueToPortfolio();
  } if (event.target.classList.contains("exchange-token-button")) {
    triggerBridgePopup();
  } if (event.target.classList.contains("bp-max-button")) {
    onMax();
  } if (event.target.classList.contains("bridge-submit-blue-button")) {
    onBridgeClick();
  } if (event.target.classList.contains("bridge-input-submit")) {
    bridgeSubmitConditionCheck();
  } if (event.target.classList.contains("bridge-loading-container")) {
    maximizeWindow();
  } if (event.target.classList.contains("minimize-button")) {
    minimizeWindow();
  } if (event.target.classList.contains("switch-chain-button")) {
    let params = event.target.getAttribute('params');
    params = JSON.parse(params);
    const chainId = _.get(params, "chainId");
    navigateAfterSwitch(chainId);
  }
}
