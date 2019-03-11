import React from "react";
import {Menu} from 'semantic-ui-react';
import {Link} from "../routes";
export default ()=>{
  return (
    <Menu style={{marginTop:'10px'}}>
      <Menu.Item name='index'>
        <Link route = "/">
        <a>首页</a>
        </Link>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item name='compaign'>
        <Link route = "/">
          <a>众筹</a>
          </Link>
        </Menu.Item>
        <Menu.Item name='add'>
          <Link route = "/compaigns/new">
        <a>+</a>
            </Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
