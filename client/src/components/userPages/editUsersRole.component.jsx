import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import React, { Component, PropTypes } from 'react';
import Navbar from '../commons/nav.component.js';
import viewUserAction from '../../actions/userManagement/viewUser.js';
import editUserAction from '../../actions/userManagement/editUser.js';

/**
 * Edit user role component
 * @class EditUsersRole
 * @extends {Component}
 */
class EditUsersRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleId: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  /**
   * @returns {void}
   * @memberof EditUsersRole
   */
  // componentWillMount() {
  //   if (!window.localStorage.getItem('token')) {
  //     browserHistory.push('/');
  //   }
  //   const token = window.localStorage.getItem('token');
  //   if (token) {
  //     this.setState({ userId: jwtDecode(token).userId });
  //     this.props.viewUser(token, jwtDecode(token).userId);
  //   }
  // }

  /**
   * @param {Object} nextProps 
   * @memberof EditUsersRole
   */
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.user);
  }

  /**
   * @param {Object} event
   * @memberof EditUsersRole
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {Object} event
   * @memberof EditUsersRole
   */
  updateUser(event) {
    // const userId = jwtDecode(this.state.token).userId;
    this.props.updateUser(this.state, userId);
  }

  /**
   * @returns {void} returns edit user page
   * @memberof EditUsersRole
   */
  render() {
    return (
      <div className="row dashboardContainer col s12">
        <Navbar />
        <div className="col s12 workspace ">
          <div className="row workspace-header"><h4>Edit Role</h4></div>
          <div className="doc_list z-depth-4 panel doc_content">
            <form className="userProfile">
              <label htmlFor="roleId">RoleId: </label>
              <input
                type="number"
                name="roleId"
                id="roleId"
                value={this.state.roleId}
                onChange={this.handleChange}
              />
              <div className="row">
                <button
                  type="submit"
                  className="updateUser btn"
                  onClick={() => this.updateUser()}
                >Save</button>
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
 * @returns {Object} returns Object
 */
const mapStoreToProps = (state, ownProps) => {
  return {
    user: state.userReducer.user
  };
};

/**
 * @param {Object} dispatch 
 * @returns {Object} returns object
 */
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (usertoken, userDetails, userId) =>
    dispatch(editUserAction(userDetails, userId))
  };

};

export default connect(mapStoreToProps, mapDispatchToProps)(EditUsersRole);
