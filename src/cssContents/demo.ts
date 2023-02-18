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
  background-color:
  rgb(0,0,0);
  background-color:
  rgba(0,0,0,0.4);
}

#popup {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 20px;
  width: 80%;
  height: 80%;
  overflow: auto;
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
`;
