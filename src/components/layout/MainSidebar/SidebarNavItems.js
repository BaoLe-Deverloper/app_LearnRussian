import React from "react";
import { Nav } from "shards-react";
import SidebarNavItemsTeacher from "../../../data/sidebar-nav-itemsForTeacher";
import SidebarNavItem from "./SidebarNavItem";
import SidebarNavItemsStudent from "../../../data/sidebar-nav-itemsForStudent"
import {userAuth}  from './../../../auth/isAuthenticated';
class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);
    var SidebarNavItems;
    switch (userAuth.claim) {
      case "teacher":
        SidebarNavItems=SidebarNavItemsTeacher;
       break;
      case "student":
        SidebarNavItems=SidebarNavItemsStudent;
       break;
       default: break;
    }
    this.state = {
      navItems: SidebarNavItems
    };
  }

  render() {
    const { navItems: items } = this.state;
    
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} />
          ))}
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
