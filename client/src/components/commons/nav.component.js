import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import logoutAction from '../../actions/authorization/logoutAction.js';

/**
 * @class Navbar
 * @extends {Component}
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
    const token = (window.localStorage.getItem('token'));
    if (token) {
      this.state = {
        id: jwtDecode(token).userId,
        firstName: jwtDecode(token).firstName
      };
      this.logout = this.logout.bind(this);
    }
  }
  /**
   * @param {any} event
   * @returns {void}
   * @memberOf Navbar
   */
  logout() {
    window.localStorage.removeItem('token');
    this.props.logout();
    this.setState({
      id: null
    });
    browserHistory.push('/');
  }
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Navbar
   */
  render() {
    if (window.localStorage.getItem('token')) {
      return (
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="myContainer">
              <i className="material-icons left">library_books</i>
              PK-DOCMAN
            </Link>
            <ul className="right">
              <li className="upperCase">Welcome, {this.state.firstName}</li>
              <li>
                <Link onClick={this.logout}>
                  <i className="material-icons left">lock_outline</i>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
    return (
      <nav id="nav">
        <div className="nav-wrapper">
          <Link to='/' className="myContainer">
            <i className="material-icons left">library_books</i>
            PK-DOCMAN
          </Link>
          <ul className="right">
            <li>
              <Link to="/login">
                <i className="material-icons left">lock_open</i>
                LOGIN
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <i className="material-icons left">vpn_key</i>
                SIGNUP
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
/**
 * mapDispatchToProps
 * @param {any} dispatch 
 * @returns {Object} Object
 */
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (credentials) => dispatch(logoutAction(credentials))
  };
};
/**
 * mapStoreToProps
 * @param {any} state 
 * @returns {Object} Object
 */
const mapStoreToProps = (state) => {
  return {
    user: state.user
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Navbar);