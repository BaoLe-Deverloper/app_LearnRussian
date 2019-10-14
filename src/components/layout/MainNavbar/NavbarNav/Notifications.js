import React from "react";
import { NavItem, NavLink, Badge, Collapse, DropdownItem } from "shards-react";
import {Link} from "react-router-dom";
import axios from "axios";
import {config} from "./../../../../config";
export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      notifications:[]
    };
  
   

    this.toggleNotifications = this.toggleNotifications.bind(this);
  }
  componentWillMount(){
    const notifications = JSON.parse(sessionStorage.getItem("notifications"));
    if(!notifications){
      const  token = localStorage.getItem("accessToken");
      if (token) {
        axios(config.UrlServerBase + "notification" , {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
              'Authorization': "Bearer " + token
            
          }}).then(resp => {
            if(!resp.data.err){
              sessionStorage.setItem("notifications",JSON.stringify(resp.data))
              this.setState({notifications:resp.data});
              console.log("get")
            }           
          }) 
      }
    }else{
      this.setState({notifications});    
    }
}
  toggleNotifications() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem className="border-right dropdown notifications">
        <NavLink
          className="nav-link-icon text-center"
          onClick={this.toggleNotifications}
        >
          <div className="nav-link-icon__wrapper">
            <i className="material-icons">&#xE7F4;</i>
            <Badge pill theme="danger">
              {this.state.notifications.length}
            </Badge>
          </div>
        </NavLink>
        <Collapse
          open={this.state.visible}
          className="dropdown-menu dropdown-menu-small"
        >
        {this.state.notifications.map((val,i)=>(
          
          <DropdownItem key={i}>
            <div className="notification__icon-wrapper">
              <div className="notification__icon">
                <i className="material-icons">&#xE6E1;</i>
              </div>
            </div>
            <div className="notification__content">
              <span className="notification__category">{val.from}</span>
              <p>
                {val.message}
              </p>
              <Link to={{ pathname: "/test", state: { id: val.idTest } }} > Go to Test </Link>
            </div>
          </DropdownItem>
        ))}
          
          
          <DropdownItem className="notification__all text-center">
            View all Notifications
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
