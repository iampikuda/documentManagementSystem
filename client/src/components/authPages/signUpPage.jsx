import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import signupAction from '../../actions/authorization/signupAction.js';

let authUser;
const AdminRoleId = 1;
let token;
/**
 * @class signUpPage
 * @extends {Component}
 */
class signUpPage extends Component {
  constructor(props) {
    super(props);
    token = window.localStorage.getItem('token');
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      roleId: '99'
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    authUser = {};
    if (token) {
      authUser = jwtDecode(token) || {};
      if (authUser.roleId !== 1) {
        browserHistory.push('/dashboard');
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error === 'unique violation') {
      this.setState({
        error: 'User already exists'
      });
    }
    if (nextProps.user) {
      browserHistory.push('/dashboard');
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }
  onSubmit(e) {
    e.preventDefault();
    if(this.state.roleId === '99' && token) {
      Materialize.toast('Please select a role', 3000)
    } else {
      if(this.state.password === this.state.confirmPassword){
        this.props.Signup(this.state);
        Materialize.toast('New user created', 3000)
        // browserHistory.push('/');
      }else {
        Materialize.toast('Passwords don\'t match!', 3000)
      }
    }
  }
  /**
   * @returns {Object} Object
   * @memberof signUpPage
   */
  render() {
    const roleIdNow = authUser.roleId || ''
    return (roleIdNow === AdminRoleId) ?
      <div>
        <div className="row"></div>
        <div className="row signupForm">
          <form className="col s12" onSubmit={this.onSubmit}>
            {this.state.error ?
              <div className="center">
                {this.state.error}
              </div>
              : <span />
            }
            {this.state.success ?
              <div className="center">
                {this.state.success}
              </div>
              : <span />
            }
            <div className="row">
              <div className="input-field col s6">
                <input
                  value={this.state.firstName}
                  onChange={this.onChange}
                  name="firstName"
                  id="firstName"
                  type="text"
                  className="validate"
                  required />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input-field col s6">
                <input
                  value={this.state.lastName}
                  onChange={this.onChange}
                  name="lastName"
                  id="lastName"
                  type="text"
                  className="validate"
                  required />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                  id="email"
                  type="email"
                  className="validate"
                  required />
                <label htmlFor="email">Email</label>
              </div>
              <div className="col s6">
                <select
                  name="roleId"
                  id="roleId"
                  onChange={this.onChange}
                  value={this.state.roleId}
                  className="browser-default"
                  required
                  >
                  <option value={99} disabled>Select RoleId</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Regular</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                  id="password"
                  type="password"
                  className="validate"
                  required />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s6">
                <input
                value={this.state.confirmPassword}
                onChange={this.onChange}
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                 className="validate"
                required />
                <label  htmlFor="confirmPassword">Confirm Password</label>
              </div>
            </div>

            <button className="btn waves-effect waves-light center auth-button" type="submit" name="action">Add User
              <i className="material-icons right"></i>
            </button>
          </form>
        </div>
      </div> :
      <div>
        <div className="row">
          <h4 className="center auth-header"><Link to="/">PK-DOCMAN</Link></h4>
        </div>
        <div className="row signupForm">
          <h4 className="center">Sign Up</h4>
          <form className="col s12" onSubmit={this.onSubmit}>
            {this.state.error ?
              <div className="center">
                {this.state.error}
              </div>
              : <span />
            }
            {this.state.success ?
              <div className="center">
                {this.state.success}
              </div>
              : <span />
            }
            <div className="row">
              <div className="input-field col s6">
                <input
                  value={this.state.firstName}
                  onChange={this.onChange}
                  name="firstName"
                  id="firstName"
                  type="text"
                  className="validate"
                  required />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input-field col s6">
                <input
                  value={this.state.lastName}
                  onChange={this.onChange}
                  name="lastName"
                  id="lastName"
                  type="text"
                  className="validate"
                  required />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                  id="email"
                  type="email"
                  className="validate"
                  required />
                <label htmlFor="email">Email</label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                  id="password"
                  type="password"
                  className="validate"
                  required />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                value={this.state.confirmPassword}
                onChange={this.onChange}
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                 className="validate"
                required />
                <label  htmlFor="confirmPassword">Confirm Password</label>
              </div>
            </div>

            <button className="btn waves-effect waves-light center auth-button" type="submit" name="action">Sign Up
              <i className="material-icons right"></i>
            </button>
            <div className="row">
              <div className="col s12">
                <p className="center">Already have an account? <Link to="/login"> Login </Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
  }
}
const mapStoreToProps = (state) => {
  return {
    user: state.signupReducer.user,
    error: state.signupReducer.error
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Signup: userData => dispatch(signupAction(userData))
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(signUpPage);
