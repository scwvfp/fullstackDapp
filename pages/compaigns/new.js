import React,{Component} from "react";
import Layout from '../../components/Layout';
import {Button,Form,Input,Message} from 'semantic-ui-react';
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

// export default ()=>{
//   return <h1>new wangjian</h1>;
// }

class CompaignNew extends Component{

  state = {
    mininum:"",
    errorMessage:""
  }
  onSubmit = async()=>{

    try{
        event.preventDefault();
        const accounts = await  web3.eth.getAccounts();
        await factory.methods.createCampain(this.state.mininum).send({from:accounts[0]});

    }catch(err){
      this.setState({errorMessage:err.message});
    }

  }
  render(){
    return (
      <Layout>
      <h1>创建众筹</h1>
      <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>请输入最小的贡献量</label>
          <Input label="wei" labelPosition="right" placeholder='请输入'
          value={this.state.mininum} onChange={event=>this.setState({mininum:event.target.value})}/>
        </Form.Field>
        <Message error header="错误" content={this.state.errorMessage}/>
        <Button >创建众筹</Button>
      </Form>
      </Layout>
    );
  }
}

export default CompaignNew;
