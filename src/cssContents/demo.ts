export const demoCSS = "#header2 { color:red; } #popupBackground { display: block; position: fixed; z-index: 1; padding-top: 100px; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,0,0.4);} #popup {   background-color: #fefefe; margin: auto; padding: 20px; border: 1px solid #888; width: 80%;} }";

export const noBalanceCSS = `
#popupBackground {
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

#popup {
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 20px;
  width: 80%;
  height: 80%;
}

#icon-flex-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#tokens-available-flex-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 60%;
  overflow: auto;
}

#token-detail-1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  height: 40px;
  width: 100%;
}

#token-detail-0 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  height: 40px;
  width: 100%;
  background-color: #cccccc;
}

#bridge-popup-css {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 20px;
  width: 30%;
  height: 50%;
  background-color: #fefefe;
}

#bp-back-close-button-flex-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

#bp-amount-input-flex-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

#bp-max-button {
  width: 80px;
  text-align: center;
}

#bp-amount-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: stretch;
  width: 120px;
}

#bp-switch-button {
  width: 80px;
  text-align: center;
}

#bp-token-value-flex-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

#bp-balance-flex-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 200px;
  height: 50px;
}

#bp-balance-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 150;
}

#bp-balance-detail-usd {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 25px;
}

#bp-balance-detail-token {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 25px;
  align-items: center;
}

#bp-amount-value {
  border: none;
  background-color: white;
  font-size: 44px;
  text-align: center;
  outline: none;
}

#bp-switch-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
}

#bp-switch-chain-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
}

#bp-summary-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-left: -20px;
  margin-right: -20px;
}

.bp-summary-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #cccccc;
  width: 100%;
}

.exchange-row {
  background-color: #cccccc;
}

.amount-row {
  background-color: #E5E8E8;
}
`;
