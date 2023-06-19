import _ from "lodash";
import { portfolioBalance } from "../screens";
import { maximizeWindow, minimizeWindow } from "../utils";
import { bridgeSubmitConditionCheck, closePopup, navigateAfterSwitch, onBridgeClick, onMax, openChat, switchTheme, triggerBridgePopup } from "./handlerFunctions";

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
    portfolioBalance();
  } if (classList.contains("exchange-token-button")) {
    let params = event.target.getAttribute('params');
    params = JSON.parse(params);
    triggerBridgePopup(params.exchangingTokenDetail);
  } if (classList.contains("bp-max-button") || event.target.closest(".bp-max-button")) {
    onMax();
  } if (classList.contains("cyd-bridge-submit-button")) {
    onBridgeClick();
  } if (classList.contains("bridge-input-submit")) {
    bridgeSubmitConditionCheck();
  } if (classList.contains("maximize-onclick") || event.target.closest(".maximize-onclick")) {
    maximizeWindow();
  } if (classList.contains("minimize-button") || event.target.closest(".minimize-button")) {
    minimizeWindow();
  } if (classList.contains("switch-chain-button")) {
    let params = event.target.getAttribute('params');
    params = JSON.parse(params);
    const chainId = _.get(params, "chainId");
    const triggerCallback = _.get(params, "triggerCallback");
    triggerCallback ?  navigateAfterSwitch(chainId, false) : navigateAfterSwitch(chainId);
  }
}
