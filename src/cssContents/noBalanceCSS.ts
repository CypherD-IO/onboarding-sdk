export const noBalanceCSS = `
.swal2-container {
  z-index: 2147483647 !important;
}

#cyd-sdk-container {
  display: flex !important;
  flex-direction: column !important;
  position: fixed !important;
  justify-content: center !important;
  align-items: center !important;
  z-index: 2147483646 !important;
  left: 0 !important;
  top: 0 !important;
  width: 100% !important;
  height: 100% !important;
  color: black !important;
}

.cyd-blurredBackdrop {
  background-color: rgba(0,0,0,0.4) !important;
  backdrop-filter: blur(5px) !important;
}

#cyd-popup-background {
  display: flex !important;
  flex-direction: column !important;
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  overflow: auto !important;
}

.cyd-tokens-available-flex-box {
  height: 100% !important;
  overflow: scroll !important;
  border-radius: 10px !important;
  border: 1px solid #f2f2f2 !important;
}

#cyd-tokenList-header{
  text-align: center !important
}

#cyd-portfolio-balance-table {
  border-collapse: collapse !important;
}

.cyd-portfolio-token-detail{
  height: 75px !important;
}

#cyd-chain{
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
}

#cyd-token{
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
}

.cyd-blue-button{
  background-color: #2081E2 !important;
  border: none !important;
  color: white !important;
  border-radius: 3px !important;
  float: right !important;
}

.cyd-disabled-button {
  background-color: gray !important;
  color: black !important;
}

#cyd-bp-amount-input {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  text-align: center !important;
  align-items: stretch !important;
}

#cyd-bp-token-value-flex-box {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: center !important;
}

#cyd-bp-balance-detail-usd {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: space-between !important;
}

#cyd-bp-balance-detail-token {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: center !important;
}


#cyd-bp-switch-container {
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  width: 100% !important;
  align-items: center !important;
}

.cyd-bp-summary-row {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100% !important;
}

:root {
  --light: #d8dbe0 !important;
  --dark: #28292c !important;
  --link: rgb(27, 129, 112) !important;
  --link-hover: rgb(24, 94, 82) !important;
}

.cyd-toggle-switch {
  position: relative !important;
}

.cyd-label {
  position: absolute !important;
  width: 75px !important;
  height: 30px !important;
  background-color: var(--dark) !important;
  border-radius: 50px !important;
  cursor: pointer !important;
}

.cyd-toggle-input {
  position: absolute !important;
  display: none !important;
}

.cyd-slider {
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
  border: 1px solid var(--theme-primaryText) !important;
  border-radius: 50px !important;
  transition: 0.3s !important;
}

.cyd-toggle-input:checked ~ .cyd-slider {
  background-color: var(--light) !important;
}

.cyd-slider::before {
  content: "" !important;
  position: absolute !important;
  top: 3px !important;
  left: 6px !important;
  width: 20px !important;
  height: 20px !important;
  border-radius: 15px !important;
  box-shadow: inset 6px 0px 0px 0px var(--light) !important;
  background-color: var(--dark) !important;
  transition: 0.3s !important;
  transform: rotate(-30deg) !important;
}

.cyd-toggle-input:checked ~ .cyd-slider::before {
  transform: translateX(42px) !important;
  background-color: var(--dark) !important;
  box-shadow: none !important;
}
`;
