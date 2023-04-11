export const noBalanceCSS = `
.swal2-container {
  z-index: 2147483647;
}

#sdkContainer {
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
  overflow: auto;
  color: black;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  backdrop-filter: blur(5px);
}

#popupBackground {
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  // z-index: 2147483646;
  // left: 0;
  // top: 0;
  width: 100%;
  // overflow: auto;
  // color: black;
  // background-color: rgb(0,0,0);
  // background-color: rgba(0,0,0,0.4);
  // backdrop-filter: blur(5px);
}

#popup {
  // background-color: #fefefe;
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin: auto;
  width: 60%;
  height: auto;
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

// tr:nth-child(odd) {
//   background-color: #f5f5f5;
// }

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

.disabled-button {
  background-color: gray;
  color: black;
}

// #bridge-popup-css {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   margin: auto;
//   width: 30%;
//   background-color: #fefefe;
// }

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

:root {
  --light: #d8dbe0;
  --dark: #28292c;
  --link: rgb(27, 129, 112);
  --link-hover: rgb(24, 94, 82);
}

.toggle-switch {
  position: relative;
}

label {
  position: absolute;
  width: 75px;
  height: 30px;
  background-color: var(--dark);
  border-radius: 50px;
  cursor: pointer;
}

.toggle-input {
  position: absolute;
  display: none;
}

.slider {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid var(--theme-primaryText);
  border-radius: 50px;
  transition: 0.3s;
}

.toggle-input:checked ~ .slider {
  background-color: var(--light);
}

.slider::before {
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
}

.toggle-input:checked ~ .slider::before {
  transform: translateX(42px);
  background-color: var(--dark);
  box-shadow: none;
}
`;
