export const noBalanceCSS = `
#popupBackground {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  z-index: 2147483647;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  color: black;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  backdrop-filter: blur(3px);
}

#popup {
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 60%;
  height: 92%;
  border-radius: 30px;
}

#icon-flex-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 120px;
  margin-top: 30px;
}

#tokens-available-flex-box {
  width: 80%;
  overflow: scroll;
  border: 1px solid #f2f2f2;
  border-radius: 10px;
}

#cyd-tokenList-header{
  text-align: center
}

#token-detail-1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 10px;
}

#token-detail-0 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: #f5f5f5;
  padding: 10px;
}

table {
  border-collapse: collapse;
}

tr{
  height: 75px;
}

td{
  padding-left: 10px;
}

tr:nth-child(odd) {
  background-color: #f5f5f5;
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

#td-chain-icon {
  margin-right: 10px
}

#td-token-icon {
  margin-right: 10px
}

.blue-button{
  background-color: #2081E2;
  border: none;
  color: white;
  height: 35px;
  width: 90px;
  border-radius: 3px;
  float: right;
  margin-right: 10px
}

#bridge-popup-css {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  width: 30%;
  background-color: #fefefe;
}

#bp-amount-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: stretch;
  width: 250px;
}

#bp-token-value-flex-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}


#bp-balance-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
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
  width: 100%;
}
`;
