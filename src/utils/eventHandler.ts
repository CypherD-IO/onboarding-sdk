import _ from "lodash";
import { bridgePopup } from "./bridgePopup";

declare let globalThis: any;

export const eventHandler = (event: any) => {
  console.log('event triggered : ', event.target);
  switch (event.target.id) {
    case ("close-button"): {
      console.log("clicked close button");
      break;
    } case ("exchange-token-button"): {
      const param = event.target.getAttribute('param');
      console.log('param', param);
      const bridgeableTokensList = JSON.parse(_.get(param, "mohan"));
      console.log("clicked exhange button", bridgeableTokensList);
      console.log('target details', event.target);
      // if (event.target.nodeName === 'BUTTON') {
      //   console.log('pressed is a button : ', (event.target.parentNode.parentNode).querySelector("#td-token-name").innerHTML.toLowerCase());
      //   globalThis.exchangingTokenDetail = bridgeableTokensList[(event.target.parentNode.parentNode).querySelector("#td-token-name").innerHTML.toLowerCase()];
      // }
      bridgePopup();
      break;
    }
  }
}
