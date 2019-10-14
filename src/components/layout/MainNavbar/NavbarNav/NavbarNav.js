import React, { Component } from "react";
import { Nav } from "shards-react";

import Notifications from "./Notifications";
import UserActions from "./UserActions";

import { connect } from "react-redux";
 class navbarNav extends Component{
   
  shouldComponentUpdate(){
    return false;
  }
  render(){
    return (
      <Nav navbar className="border-left flex-row">
             <Notifications />
             <UserActions user={this.props.data.currentUser}/>
         </Nav>
         
     
    );
  }
}

const mapStateToProps = state =>({
  data : state.user
})
export default connect(mapStateToProps, null) (navbarNav)