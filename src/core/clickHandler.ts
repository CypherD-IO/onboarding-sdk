import _ from "lodash";
import { portfolioBalance } from "../screens";
import { maximizeWindow, minimizeWindow } from "../utils";
import { bridgeSubmitConditionCheck, closePopup, navigateAfterSwitch, onBridgeClick, onMax, openChat, switchTheme, triggerBridgePopup } from "./handlerFunctions";

declare let globalThis: any;

export const clickHandler = (event: any) => {
  const classList = event.target.classList;
  if (classList.contains("cyd-close-popup")) {
    let params = event.target.getAttribute('params');
    params = JSON.parse(params);
    const triggerCallback = _.get(params, "triggerCallback");
    triggerCallback ? closePopup(true) : closePopup(false);
  } if (classList.contains("cyd-back-button")) {
    globalThis.previousPage();
  } if (classList.contains("cyd-toggle-input")) {
    switchTheme();
  } if (classList.contains("cyd-chat-support")) {
    openChat();
  } if (classList.contains("cyd-info-screen-continue")) {
    portfolioBalance();
  } if (classList.contains("cyd-exchange-token-button")) {
    let params = event.target.getAttribute('params');
    params = JSON.parse(params);
    triggerBridgePopup(params.exchangingTokenDetail);
  } if (classList.contains("cyd-bp-max-button") || event.target.closest(".cyd-bp-max-button")) {
    onMax();
  } if (classList.contains("cyd-bridge-submit-button")) {
    onBridgeClick();
  } if (classList.contains("cyd-bridge-input-submit")) {
    bridgeSubmitConditionCheck();
  } if (classList.contains("cyd-maximize-onclick") || event.target.closest(".cyd-maximize-onclick")) {
    maximizeWindow();
  } if (classList.contains("cyd-minimize-button") || event.target.closest(".cyd-minimize-button")) {
    minimizeWindow();
  } if (classList.contains("cyd-switch-chain-button")) {
    let params = event.target.getAttribute('params');
    params = JSON.parse(params);
    const chainId = _.get(params, "chainId");
    const triggerCallback = _.get(params, "triggerCallback");
    triggerCallback ? navigateAfterSwitch(chainId, false) : navigateAfterSwitch(chainId);
  } if (classList.contains("cyd-dropdown-button") || event.target.closest(".cyd-dropdown-button")) {
    document.getElementById("cyd-dropdown-option-list")?.classList.toggle("hidden");
  } if (classList.contains("cyd-dropdown-option") || event.target.closest("cyd-dropdown-option")) {
    let params = event.target.getAttribute('params');
    params = JSON.parse(params);
    document.getElementById("cyd-dropdown-selected-option")!.innerText = params.value;
    document.getElementById("cyd-dropdown-option-list")?.classList.toggle("hidden");
  }
}
