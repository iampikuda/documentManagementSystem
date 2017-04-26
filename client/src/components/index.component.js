import React, { Component } from 'react';
import Navbar from './nav.component';
import Body from './body.component';
import jwtDecode from 'jwt-decode';

class Index extends Component {
  render() {
    return (
      <div >
        <div className="mainContainer">
          <div className="bg"></div>
          <Navbar />
          <Body />
        </div>
      </div>
    );
  }
}
export default Index;
