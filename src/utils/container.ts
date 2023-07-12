import { onBlurInput, onFocusInput } from ".";
import { clickHandler, inputHandler } from "../core";
import { noBalanceCSS } from "../cssContents";
import { addTailwindScript } from "../scriptContents";

declare let globalThis: any;

export const createContainer = () => {
  const popupBackground = document.createElement("div");
  popupBackground.id = "cyd-popup-background";
  popupBackground.addEventListener("click", (event) => { clickHandler(event) });
  popupBackground.addEventListener("input", (event) => { inputHandler(event) });
  popupBackground.addEventListener("onfocus", (event) => { onFocusInput(event) });
  popupBackground.addEventListener("onblur", (event) => { onBlurInput(event) });

  if (globalThis.cypherWalletDetails.parentComponentId) {
    popupBackground.classList.add('max-w-[824px]');
  }

  const sdkContainer = document.createElement("div");
  sdkContainer.id = "cyd-sdk-container";

  const sheet = document.createElement("style");
  return { popupBackground, sdkContainer, sheet };
}

export const appendContainerToBody = (popupBackground: HTMLDivElement, sdkContainer: HTMLDivElement, sheet: HTMLStyleElement) => {
  if (globalThis.cypherWalletDetails.parentComponentId) {
    document.getElementById(globalThis.cypherWalletDetails.parentComponentId)?.appendChild(popupBackground);
  } else {
    sdkContainer.appendChild(popupBackground);
    globalThis.document.body.appendChild(sdkContainer);
  }
  sheet.innerHTML = noBalanceCSS;
  globalThis.document.body.appendChild(sheet);
  // const range = document.createRange();
  // range.setStart(globalThis.document.body, 0);
  // globalThis.document.body.appendChild(
  //   range.createContextualFragment(addTailwindScript())
  // );
}
