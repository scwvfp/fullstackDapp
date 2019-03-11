import Web3 from 'web3';
var web3;
if(typeof window != 'undefined' && window.web3 != 'undefined'){
  // 这里的provider是浏览器的provider
   web3 = new Web3(window.web3.currentProvider);
}else{
  //这里的provider是infura的provider
   const provider = new Web3.providers.HttpProvider(
     "https://ropsten.infura.io/v3/190be1de8f234f7aa406e24092b29733");
   web3 = new Web3(provider);
}


export default web3;
