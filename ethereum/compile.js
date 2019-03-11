
const path = require("path");

const solc = require("solc");

const fs = require("fs-extra");

const buildpath = path.resolve(__dirname,'build');

fs.removeSync(buildpath);

const CampainPath = path.resolve(__dirname,'contracts','campaign.sol');

const source = fs.readFileSync(CampainPath,'utf8');

const output = solc.compile(source,1).contracts;

console.log(output);
// buildpath路径是否存在  不存在则创建路径 确保路径是存在的
fs.ensureDirSync(buildpath);

// 循环遍历  并把遍历的内容放到json文件中,为了以后不用每次都编译合约 所以一次性编译好放到json中，要使用时直接获取编译好的文件
for(let contract in output){
  // contract.replace(":","") 表示把：替换掉
  fs.outputJsonSync(path.resolve(buildpath,contract.replace(":","") + '.json'),output[contract]);
}
