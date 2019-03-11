// 导入web3的实例
import web3 from "./web3";
// 构建一个实例，构建工厂实例的时候，需要这个工厂实例提供ABI的接口跟外部的以太坊网络做交互
import CampaignFactory from "./build/CampaignFactory.json";
// 构建工厂实例
const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x09552005aed737A2b9f6aee094348113e23E5711'
);
// 0xb7c0e72ffaa5a0474f7b5e004201f4a492d915444631e9d9d65b6a2d7eae0023
export default instance;
