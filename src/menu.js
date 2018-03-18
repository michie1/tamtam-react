import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

class Menu extends Component {
  render() {
    return (
        <div id="menu">
          <ul>
            <li><span className="logo">/</span></li>
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="#">People</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
    );
  }
}

export default Menu;
