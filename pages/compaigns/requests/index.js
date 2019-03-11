import React,{Component} from "react";
import {Link} from "../../../routes";
import {Button} from "semantic-ui-react";
import Layout from '../../../components/Layout';

import Campaign from "../../../ethereum/campaign";
import {Table} from "semantic-ui-react";
import RequestRow from "../../../components/RequestRow";
class CompaignRequest extends Component{

  static async getInitialProps(props){
    //把props下的query中的address取出来赋值给address变量
    const {address} = props.query;//const address = props.query.address;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestCount().call();

  //  const requestCount = await campaign.methods.getRequestCount().call();
    const approvesCount = await campaign.methods.approvesCount().call();//总的投资人数量

    //Promise.all表示里面的所有异步操作全部执行完毕后才返回requests
    const requests = await Promise.all(
        //Array().fill().map()表示获取requestCount的长度，然后遍历长度
        Array(parseInt(requestCount)).fill().map((element,index)=>{
          return campaign.methods.requests(index).call();
        })
    );
    console.log(requests);
    return {address,requests,approvesCount};
  }

  renderRow(){
    return this.props.requests.map((request,index)=>{
      return (
        <RequestRow
            key={index}
            id = {index}
            request={request}
            address={this.props.address}>
            approvesCount={this.props.approvesCount}
        </RequestRow>
      );
    });
  }

  render(){
    //console.log(this.props.requests);
  //  const {HeaderCell,Row,Header} = Table;
    return (
      <Layout>
      <h1>请求列表</h1>
      <Link route = {`/compaigns/${this.props.address}/requests/new`}>
        <a>
          <Button primary>增加请求</Button>
        </a>
      </Link>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>描述</Table.HeaderCell>
            <Table.HeaderCell>总的金额</Table.HeaderCell>
            <Table.HeaderCell>受益人地址</Table.HeaderCell>
              <Table.HeaderCell>同意人的投资</Table.HeaderCell>
            <Table.HeaderCell>是否同意</Table.HeaderCell>
            <Table.HeaderCell>是否完成</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

        </Table.Body>
      </Table>
          {this.renderRow()}
      </Layout>
    );
  }
}

export default CompaignRequest;
