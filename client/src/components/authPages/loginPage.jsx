import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { browserHistory, Link } from 'react-router';
import loginAction from '../../actions/authorization/loginAction.js';

/**
 * Login page
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  /**
   * renders the Nav component
   * @returns {void}
   * @memberOf Login
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redirectIfLoggedIn = this.redirectIfLoggedIn.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }
  componentWillMount() {
    this.redirectIfLoggedIn();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      error: nextProps.loginError,
      success: nextProps.loginSuccess
    });
    setTimeout(() => {
      this.redirectIfLoggedIn();
    }, 1000);
  }
  redirectIfLoggedIn (){
    const token = window.localStorage.getItem('token');
    if (token) {
      browserHistory.push('/dashboard');
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <h4 className="center auth-header"><Link to="/">PK-DOCMAN</Link></h4>
        </div>
        <div className="row loginForm">
          <h4 className="center">Login</h4>
          <form className="col s12" onSubmit={this.onSubmit}>
            { this.state.error ?
              <div className="center">
                { this.state.error }
              </div>
                : <span />
            }
              { this.state.success ?
                <div className="center">
                  { this.state.success }
                </div>
                  : <span />
              }
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
            <button className="btn waves-effect waves-light center auth-button" type="submit" name="action">Login
              <i className="material-icons right"></i>
            </button>
            <div className="row">
              <div className="col s12">
                <p className="center">Don't have an account? <Link to="/signup"> Sign Up </Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStoreToProps = (state) => {
  return {
    // user: state.loginReducer.user,
    loginSuccess: state.loginReducer.success,
    loginError: state.loginReducer.error,
    // token: state.loginReducer.token
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(loginAction(credentials))
  }
}
export default connect(mapStoreToProps, mapDispatchToProps)(Login);
