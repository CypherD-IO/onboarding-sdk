export const noBalanceCSS = `
.swal2-container {
  z-index: 2147483647;
}

#cyd-sdk-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 2147483646;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: black;
}

.cyd-blurredBackdrop {
  background-color: rgba(0,0,0,0.4);
  backdrop-filter: blur(5px);
}

#cyd-popup-background {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.cyd-tokens-available-flex-box {
  height: 100%;
  overflow: scroll;
  border-radius: 10px;
  border: 1px solid #f2f2f2;
}

#cyd-tokenList-header{
  text-align: center
}

#cyd-portfolio-balance-table {
  border-collapse: collapse;
}

.cyd-portfolio-token-detail{
  height: 75px;
}

#cyd-chain{
  display: flex;
  flex-direction: row;
  align-items: center;
}

#cyd-token{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cyd-blue-button{
  background-color: #2081E2;
  border: none;
  color: white;
  border-radius: 3px;
  float: right;
}

.cyd-disabled-button {
  background-color: gray;
  color: black;
}

#cyd-bp-amount-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: stretch;
}

#cyd-bp-token-value-flex-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#cyd-bp-balance-detail-usd {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#cyd-bp-balance-detail-token {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}


#cyd-bp-switch-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
}

.cyd-bp-summary-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

:root {
  --light: #d8dbe0;
  --dark: #28292c;
  --link: rgb(27, 129, 112);
  --link-hover: rgb(24, 94, 82);
}

.cyd-toggle-switch {
  position: relative;
}

.cyd-label {
  position: absolute;
  width: 75px;
  height: 30px;
  background-color: var(--dark);
  border-radius: 50px;
  cursor: pointer;
}

.cyd-toggle-input {
  position: absolute;
  display: none;
}

.cyd-slider {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid var(--theme-primaryText);
  border-radius: 50px;
  transition: 0.3s;
}

.cyd-toggle-input:checked ~ .cyd-slider {
  background-color: var(--light);
}

.cyd-slider::before {
  content: "";
  position: absolute;
  top: 3px;
  left: 6px;
  width: 20px;
  height: 20px;
  border-radius: 15px;
  box-shadow: inset 6px 0px 0px 0px var(--light);
  background-color: var(--dark);
  transition: 0.3s;
  transform: rotate(-30deg);
}

.cyd-toggle-input:checked ~ .cyd-slider::before {
  transform: translateX(42px);
  background-color: var(--dark);
  box-shadow: none;
}
`;
