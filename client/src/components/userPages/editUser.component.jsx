import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component, PropTypes } from 'react';
import Navbar from '../commons/nav.component.js';
import viewUserAction from '../../actions/userManagement/viewUser.js';
import editUserAction from '../../actions/userManagement/editUser.js';

/**
 * Edit users
 * @class EditUser
 * @extends {Component}
 */
class EditUser extends Component {
  /**
   * Creates an instance of EditUser.
   * @param {Object} props
   * @memberof EditUser
   */
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: props.user ? props.user.email : '' || '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @memberof EditUser
   */
  componentWillMount() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      browserHistory.push('/');
    } else {
    const user = jwtDecode(token);
    this.setState({
      userId: user.userId
    });
    this.props.viewUser(token, user.userId);
  }
  }

  /**
   * @param {Object} nextProps
   * @memberof EditUser
   */
  componentWillReceiveProps(nextProps) {
    this.setState ({
      firstName: nextProps.user.firstName ? nextProps.user.firstName : '',
      lastName: nextProps.user.firstName ? nextProps.user.lastName : '',
      email: nextProps.user.email ? nextProps.user.email : '',
    });
  }

  /**
   * @param {Object} event
   * @memberof EditUser
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {Object} event
   * @memberof EditUser
   */
  onSubmit(event) {
    event.preventDefault();
    const details = {
      email: this.state.email,
      password: this.state.password      
    }
    const token = window.localStorage.getItem('token');
    const userId = jwtDecode(token).userId;
    if(this.state.password === this.state.confirmPassword){
        this.props.updateUser(details, userId);
        // browserHistory.push('/');
      }else {
        Materialize.toast('Passwords don\'t match!', 3000)
      }
  }

  /**
   * @returns {void} returns edit user page
   * @memberof EditUser
   */
  render() {
    return (
      <div className="main-container">
        <div className="row dashboardContainer col s12 ">
          <div className="bg"></div>
          <Navbar />
          <div className="user body-innards">
            <div className="row workspace-header"><h4>Profile</h4></div>
            <div className="formuser">
              <form className="userProfile" onSubmit={this.onSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input
                  value={this.state.firstName}
                  onChange={this.onChange}
                  name="firstName"
                  id="firstName"
                  type="text"
                  className="validate"
                  required disabled/>
                <label htmlFor="lastName">Last Name</label>
                <input
                value={this.state.lastName}
                onChange={this.onChange}
                name="lastName"
                id="lastName"
                type="text"
                className="validate"
                required disabled/>

                <label htmlFor="email">Email</label>
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                  id="email"
                  type="email"
                  className="validate"
                  required />

                <label htmlFor="password">Password</label>
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                  placeholder="***********"
                  id="password"
                  type="password"
                  className="validate"
                  required />
                <label  htmlFor="confirmPassword">Confirm Password</label>                
                <input
                  value={this.state.confirmPassword}
                  onChange={this.onChange}
                  name="confirmPassword"
                  placeholder="***********"
                  id="confirmPassword"
                  type="password"
                  className="validate"
                  required />                
                <button 
                  className="btn waves-effect waves-light center auth-button"
                  type="submit" name="action">
                  Update
                  <i className="material-icons right">vpn_key</i>
                </button>
                <p className="center">
                <Link
                  to='/dashboard'>
                  Go to dashboard
                </Link>
                </p>
              </form>
              <div />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const mapStoreToProps = (state, ownProps) => {
  return {
    user: state.userReducer.viewUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewUser: (usertoken, userId) =>
    dispatch(viewUserAction(usertoken, userId)),
    updateUser: (userDetails, userId) =>
    dispatch(editUserAction(userDetails, userId)),
    deleteUser: (userId) => dispatch(deleteUserAction(userId))
  };

};

export default connect(mapStoreToProps, mapDispatchToProps)(EditUser);
