import React, { Component } from 'react';
import Navbar from './commons/nav.component';
import Body from './commons/home.component';
// import jwtDecode from 'jwt-decode';

/**
 * Home component
 * @class Index
 * @extends {Component}
 */
class Index extends Component {
  render() {
    return (
      <div >
        <div className="main-container">
          <div className="bg"></div>
          <Navbar />
          <Body />
        </div>
      </div>
    );
  }
}
export default Index;
