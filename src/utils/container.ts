import { onBlurInput, onFocusInput } from ".";
import { clickHandler, inputHandler } from "../core";
import { noBalanceCSS } from "../cssContents";
import { addTailwindScript } from "../scriptContents";

declare let globalThis: any;

export const createContainer = () => {
  const popupBackground = document.createElement("div");
  popupBackground.id = "cyd-popup-background";
  popupBackground.classList.add("@container/cyd");
  popupBackground.addEventListener("click", (event) => {
    clickHandler(event);
  });
  popupBackground.addEventListener("input", (event) => {
    inputHandler(event);
  });
  popupBackground.addEventListener("onfocus", (event) => {
    onFocusInput(event);
  });
  popupBackground.addEventListener("onblur", (event) => {
    onBlurInput(event);
  });

  if (globalThis.cypherWalletDetails.parentComponentId) {
    popupBackground.classList.add("cyd-max-w-[824px]");
    popupBackground.classList.add("cyd-max-h-[807px]");
    popupBackground.classList.add("cyd-p-[20px]");
  } else {
    popupBackground.classList.add("cyd-justify-center");
    popupBackground.classList.add("cyd-items-center");
  }

  const sdkContainer = document.createElement("div");
  sdkContainer.id = "cyd-sdk-container";

  const sheet = document.createElement("style");
  return { popupBackground, sdkContainer, sheet };
};

export const appendContainerToBody = (
  popupBackground: HTMLDivElement,
  sdkContainer: HTMLDivElement,
  sheet: HTMLStyleElement
) => {
  if (globalThis.cypherWalletDetails.parentComponentId) {
    document
      .getElementById(globalThis.cypherWalletDetails.parentComponentId)
      ?.appendChild(popupBackground);
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
};
