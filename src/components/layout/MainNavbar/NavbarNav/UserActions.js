import React from "react";
import { Link } from "react-router-dom";
import {userActions} from './../../../../Redux/Actions';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { connect } from "react-redux";

 class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      urlAvarta:"https://im0-tub-ru.yandex.net/i?id=e360b0d0c9cd3982926ae6cac947e056-l&n=13",
      username:"Baole"
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {

    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={this.props.user.urlAvatar ? this.props.user.urlAvatar : require("./../../../../images/avatars/userAvatar.png") }
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{this.props.user.name}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
         
          <DropdownItem tag={Link} to="user-profile-lite">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/" onClick={()=>{this.props._Logout()}} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  _Logout: () => {dispatch(userActions.userLogOut())}
})
export default connect(null, mapDispatchToProps)(UserActions)