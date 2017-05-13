import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateUser from '../authPages/signUpPage.jsx';

/**
 * add user modal
 * @class AddUser
 * @extends {Component}
 */
class AddUser extends Component {
  /**
   * Creates an instance of AddUser.
   * @memberof AddUser
   */
  constructor() {
    super();
  }
  /**
   * @returns {void} returns create user modal
   * @memberof AddUser
   */
  render() {
    return (
      <div className="inline">
        <Link data-target="modalUser" id="create-user"
          className="waves-effect waves-light btn-large create-doc">
          <i className="material-icons left">add_circle_outline</i>
          Add User
        </Link>
        <div id="modalUser" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Create a User</h4>
            <CreateUser />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close
            waves-effect waves-green btn-flat ">Close</a>
          </div>
        </div>
      </div>
    )
  }
}

export default AddUser;