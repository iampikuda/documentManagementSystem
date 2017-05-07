import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import Navbar from '../commons/nav.component.js';
import SubNavBar from '../commons/subNavBar.jsx'
import viewUserAction from '../../actions/userManagement/viewUser.js';


/**
 * View user componen
 * @class ViewUser
 * @extends {Component}
 */
class ViewUser extends Component {
  /**
   * Creates an instance of ViewUser.
   * @param {Object} props
   * @memberof ViewUser
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: jwtDecode(window.localStorage.getItem('token')).roleId,
      userId: jwtDecode(window.localStorage.getItem('token')).userId
    };
  }

  /**
   * @memberof ViewUser
   */
  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    const token = window.localStorage.getItem('token');
    if (token) {
      this.setState({ userId: jwtDecode(token).userId });
      this.props.viewUser(token, jwtDecode(token).userId);
    }
  }

  /**
   * @param {Object} nextProps 
   * @memberof ViewUser
   */
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.user);
  }

  /**
   * @param {any} event 
   * @memberof ViewUser
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @returns {void} returns page
   * @memberof ViewUser
   */
  render() {
    return (
      <div className="row  col s12">
        <Navbar />
        <SubNavBar />
        <div className="col s12 ">
          <div className="row "><h4>Profile</h4></div>
          <div className="doc_list z-depth-4 panel doc_content">
            <form className="userProfile" autoComplete="off">
              <div className="row">
                <label htmlFor="userName">Username: </label>
                <span>{this.state.userName}</span>
              </div>
              <div className="row">
                <label htmlFor="email">Email: </label>
                <span>{this.state.email}</span>
              </div>
              <div className="row">
                <label htmlFor="firstName">First Name: </label>
                <span>{this.state.firstName}</span>
              </div>
              <div className="row">
                <label htmlFor="lastName">Last Name: </label>
                <span>{this.state.lastName}</span>
              </div>
              <div className="row">
                  <label htmlFor="password">Password: </label>
                  <span>********</span>
              </div>
              <div className="row">
                <label htmlFor="role">Role: </label>
                <span className="userRole">{this.state.role}</span>
              </div>
              <div className="row">
                  <Link
                    to="/profile/edit"
                    className="btn"
                  >Edit Profile</Link>
                </div>
            </form>
            <div />
          </div>
        </div>
      </div>

    );
  }
}

/**
 * @param {Object} state 
 * @param {Object} ownProps 
 * @returns {void} returns object
 */
const mapStoreToProps = (state, ownProps) => {
  return {
    user: state.userReducer.user
  };
};

/**
 * @param {any} dispatch 
 * @returns {Object} returns object
 */
const mapDispatchToProps = (dispatch) => {
  return {
    viewUser: bindActionCreators(viewUserAction, dispatch)
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(ViewUser);
