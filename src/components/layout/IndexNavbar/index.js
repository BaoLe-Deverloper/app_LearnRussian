import React, { Component } from "react";
import './style.css';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavItem,
    NavLink,
    Nav,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    Collapse
} from "shards-react";

class navbarIndex extends Component {
    constructor() {
        super();
        this.state = {
            dropdownOpen: false,
            collapseOpen: false
        };

    }
    toggleDropdown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleNavbar = () => {
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    }

 
    render() {

        return (

            <Navbar style={{ width: "100%", "zIndex": 1000 }} expand="md">
                <NavbarBrand href="#">App Learn Russian</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} />
                <Collapse open={this.state.collapseOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink active href="#">
                                Active
                                </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" disabled>
                                Disabled
                                </NavLink>
                        </NavItem>
                    </Nav>

                    <Nav navbar className="ml-auto">
                        <InputGroup size="xs" seamless>
                            <Dropdown
                                open={this.state.dropdownOpen}
                                toggle={this.toggleDropdown}
                            >
                                <DropdownToggle nav caret><i className="material-icons">person</i>
                                    App Info
                                    </DropdownToggle>
                                <DropdownMenu right>
                                  
                                    <DropdownItem>Info Apps</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </InputGroup>
                    </Nav>
                </Collapse>
              
            </Navbar>


        );
    }
}



export default navbarIndex;