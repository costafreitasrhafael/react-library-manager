import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false, 
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return(            
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link"  to='/dashboard'>
                                        <span className="fa fa-tachometer fa-lg"></span> Dashboard
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink className="nav-link"  to='/authors'>
                                        <span className="fa fa-users fa-lg"></span> Authors
                                    </NavLink>
                                </NavItem> 

                                <NavItem>
                                    <NavLink className="nav-link"  to='/books'>
                                        <span className="fa fa-book fa-lg"></span> Books
                                    </NavLink>
                                </NavItem> 

                                <NavItem>
                                    <NavLink className="nav-link"  to='/reports'>
                                        <span className="fa fa-flag fa-lg"></span> Reports
                                    </NavLink>
                                </NavItem>

                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>             
            </React.Fragment>
        );
    }
}

export default Header;