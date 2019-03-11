pragma solidity ^0.4.24;

/* 创建众筹工厂 */
contract CampaignFactory{
    address[] public deployedCampain;
    function createCampain(uint mininum) public{
      address newCampain = new Campaign(mininum,msg.sender);
      deployedCampain.push(newCampain);
    }
    function getDeployedCampaign()public view returns(address[]){
      return deployedCampain;
    }
}

contract Campaign{
  /* 管理者创建请求结构体 */
  struct Request{
    /* 请求描述 */
    string description;
    /* 请求总金额 */
    uint value;
    /* 受益人地址 */
    address recipient;
    /* 状态 请求完成状态  true完成  false 未完成或失败 */
    bool complete;
    /*  */
    uint approvalCount;
    mapping(address => bool) approvers;
  }
  /* 请求列表 */
  Request[] public requests;
  /* 众筹管理者地址 */
  address public manager;
  /* 最小贡献量 */
  uint public minimunContribution;
  /* 已投资的投资人地址 */
  mapping(address => bool) public approvers;
  /* 计数  有多少人进行投资 */
  uint public approvesCount;

  modifier restricted{
    require(msg.sender == manager);
    _;
  }

  /* 构造函数初始化管理员及最小贡献量 */
  constructor(uint ninimun,address _address) public{
    manager = _address;
    minimunContribution = ninimun;
  }

  /* 捐钱，投资人进行捐款时调用  */
  function contribute() public payable{
    /* 判断投资金额是否满足最小贡献量 */
    require(msg.value > minimunContribution);
    approvers[msg.sender] = true;
    approvesCount ++;
  }
  /* 投资人创建请求函数 */
  function createRequest(string _desc,uint _value,address _address) public restricted {

      Request memory qequest = Request({
         description:_desc,
         value:_value,
         recipient:_address,
         complete:false,
         approvalCount:0
        });

        requests.push(qequest);
  }
  /* 对请求投票 */
  function approveRequest(uint index)public {
      Request storage request = requests[index];

      require(approvers[msg.sender]);
      require(!request.approvers[msg.sender]);
      request.approvers[msg.sender] = true;
  }

  function finalizeRequest(uint index)public restricted payable{
      Request storage request = requests[index];

      require(request.approvalCount > approvesCount / 2);
      request.recipient.transfer(request.value);
      request.complete=true;
  }

  function getSummary() public view returns(uint,uint,uint,uint,address){
    return (minimunContribution,address(this).balance,requests.length,approvesCount,manager);
  }

  function getRequestCount() public view returns(uint){
    return requests.length;
  }

}
