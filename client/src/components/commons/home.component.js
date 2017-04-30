import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'react-materialize';
import { Link } from 'react-router';
import {toastr} from 'react-redux-toastr'

class Body extends Component {
  render() {
    // {() => toastr.success('The title', 'The message')}
    if (window.localStorage.getItem('token')) {
      return (
        <div>
          <div className="bodyInnards">
            <Row>
              <Col m={12}>
                <i className="material-icons">library_books</i>
                <h4>Your Document Management System <br /><em>...A safe place for all your files</em></h4>
                <Link to='/dashboard' className="waves-effect waves-light btn-large" >Go to dashboard</Link>
              </Col>
            </Row>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="bodyInnards">
          <Row>
            <Col m={12}>
              <i className="material-icons">library_books</i>
              <h4>Your Document Management System <br /><em>...A safe place for all your files</em></h4>
              <Link to='/signup' className="waves-effect waves-light btn-large" >Get Started</Link>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Body;
