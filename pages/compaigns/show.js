import React from "react";
// 导入的是一个函数,通过函数的中传入的地址获取实例
import Campaign from "../../ethereum/campaign";
import Layout from '../../components/Layout';
import ContributeFrom from "../../components/contributeForm";
import web3 from "../../ethereum/web3";
import {Grid,Button,Card,Column} from "semantic-ui-react";
import {Link} from '../../routes';

class Compaignshow extends React.Component{
  static async getInitialProps(props){
    // console.log(props.query.address);
    //获取众筹的实例，
  const campaign =  Campaign(props.query.address);
  const summary = await campaign.methods.getSummary().call();
    return {
      address:props.query.address,
      mininumContribute:summary[0],
      balance:summary[1],
      requestCount:summary[2],
      approvesCount:summary[3],
      manager:summary[4],
    };
  }

  renderCards(){
    const {
      address,
      mininumContribute,
      balance,
      requestCount,
      approvesCount,
      manager,
    }=this.props;

    const items = [
      {
        header : manager,
        description : "当前管理者创建了众筹列表，并且是众筹的受益人",
        meta : "管理者的地址",
        style : {overflowWrap:'break-word'}
      },
      {
        header : mininumContribute,
        description : "你想对此众筹投资，就需要至少大于总金额",
        meta : "最小贡献量",
        style : {overflowWrap:'break-word'}
      },
      {
        header : requestCount,
        description : "当前的管理者创建请求从合约中提钱，必须要大于50%的投资人同意",
        meta : "请求数量",
        style : {overflowWrap:'break-word'}
      },
      {
        header : approvesCount,
        description : "已经为当前众筹的投资人的数量",
        meta : "投资人的数量",
        style : {overflowWrap:'break-word'}
      },
      {
        header : web3.utils.fromWei(balance,"ether"),
        description : "当前众筹中，还剩下了多少的金额.",
        meta : "众筹总的金额(ether)",
        style : {overflowWrap:'break-word'}
      }
    ];

    return <Card.Group items={items} />;
  }

  render(){

    return (
      <Layout>
        <h1>众筹显示 </h1>
        <Grid>
          <Grid.Row>

            <Grid.Column width={10}>
              {this.renderCards()}

            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeFrom address={this.props.address}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route = {`/compaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary> 查看请求</Button>
                </a>
              </Link>
              </Grid.Column>
          </Grid.Row>
        </Grid>

      </Layout>
    );
  }
}

export default Compaignshow;
