// 导入truffle-hdwallet-provider包
const HDWalletProvider = require("truffle-hdwallet-provider");
// 导入web3包
const Web3 = require("web3");
// 导入compile输出的文件
const campaignFactory = require("./build/CampaignFactory.json");

// 传入两个参数到HDWalletProvider中，
// 第一个参数是12个词的助记词，
// 第二个参数是infura网站中创建的工程的网址，想把合约部署到哪个网络(主网和三大测试网络)就用网络对应的网址
const provider = new HDWalletProvider("swarm destroy brain burst light hub ozone negative crack attitude move later",
"https://ropsten.infura.io/v3/190be1de8f234f7aa406e24092b29733");
// provider由infura的服务提供，构建的provider HDWalletProvider 把provider传入到web3当中来
const web3 = new Web3(provider);

const deploy = async() =>{
  console.log(campaignFactory.interface);
  // 从web3中获取帐户信息复制给account
  const accounts = await web3.eth.getAccounts();
  // console.log("attemp to deploy contract",accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(campaignFactory.interface)).deploy({data:"0x" + campaignFactory.bytecode})
    .send({from:accounts[0],gas:"1000000"});
    console.log("contract deployed to ",result.options.address);
}

deploy();


// https://ropsten.etherscan.io
// node deploy.js
