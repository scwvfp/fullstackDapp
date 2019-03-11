// 不仅要导入React 还要导入React中的Component
import React,{Component} from "react";
import { Card ,Button} from 'semantic-ui-react';
//导入上一层ethereum目录下的factory
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import {Link} from '../routes';
// react可以导出函数也可以导出class
// export default ()=>{
//   return <h1>index wangjian</h1>;
// }

// 导出class的功能要强大些
class Compaindex extends Component{
// 预编译
  static async getInitialProps(){
    const compaign = await factory.methods.getDeployedCampaign().call();
    return {compaign};
  }

  //生命周期函数
  // async componentDidMount(){
  //   const compaign = factory.methods.getDeployedCampaign().call();
  //   console.log(compaign);
  // }

  renderCampaign(){
    const items = this.props.compaign.map(address=>{
      return {
        header:address,
        description:<Link route = {`/compaigns/${address}`}><a>查看众筹</a></Link>,
        fluid:true
      }
    });
    return <Card.Group items = {items}/>;
  }
  // class中必须要有render方法代表提交
  render(){
    return (
      <Layout>
        <div>

          <h3>众筹列表</h3>
          <Link route = "/compaigns/new">
          <a>
          <Button content='创建众筹' floated = 'right' icon='add' labelPosition='right'/>
          </a>
          </Link>
          {this.renderCampaign()}
        </div>
      </Layout>
    );

  }
}

export default Compaindex;
