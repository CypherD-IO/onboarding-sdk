console.log('Success');
// var addPopupButton = document.getElementById('addPopup');
// addPopupButton.addEventListener('click', function() {

  // var popup = document.createElement('div');
  // popup.id = 'popup';
  // popup.innerHTML = '<h2>Hello!</h2><p>Welcome to my website.</p><button id="closePopup">Close</button>';

  // document.body.appendChild(popup);
// console.log(window.Cypher('0x71d357ef7e29f07473f9edfb2140f14605c9f309'));
window.Cypher({address: '0x71d357ef7e29f07473f9edfb2140f14605c9f309', fromChainId: '0x1', fromTokenContractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', fromTokenRequiredBalance: 65, callBack: () => {console.log('callBack called');}});
  // var closePopupButton = document.getElementById('closePopup');
  // closePopupButton.addEventListener('click', function() {
  //   popup.remove();
  // });
// });
