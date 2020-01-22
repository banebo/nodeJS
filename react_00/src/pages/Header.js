import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'

const Header = () => 
    <div className="header">
        <Nav tabs>
            <NavItem>
                <NavLink href='/'>Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href='/documents'>Documents</NavLink>
            </NavItem>
        </Nav>
    </div>

export default Header