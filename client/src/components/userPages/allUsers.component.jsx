import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import deleteUserAction from '../../actions/userManagement/deleteUser.js';

const SingleUserComponent = ({user, deleteUser, props, change}) => {
  return (
      <tr className="hoverable">
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>
          {
            (user.roleId !== 1) ?
              <select style={{ display: 'block' }} onChange={(e) => change(e, user.id)}>
                {
                  [...props.roles].reverse().map(role => <option value={role.id} key={role.id}>{role.title}</option>)
                }
              </select>
              :
              ''
          }

        </td>
        <td>{user.createdAt.slice(0, 10)}</td>
        <td>{user.updatedAt.slice(0, 10)}</td>
        <td><a className="red-text" href="#" onClick={() => deleteUser(user.id)} > <i className="material-icons">delete</i></a></td>
    </tr >
  );
}

/**
 * view all users component
 * @export
 * @class allUsers
 * @extends {Component}
 */
export default class allUsers extends Component {
  /**
   * Creates an instance of allUsers.
   * @param {Object} props
   * @memberof allUsers
   */
  constructor(props){
    super(props);
    this.state = {
      change: 1,
      users: [],
      roles: []
    }
    this.change = this.change.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  /**
   * @param {Object} nextProps 
   * @memberof allUsers
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.users){
      this.setState({
        users: nextProps.users,
        roles: nextProps.roles
      });
    }
  }

  /**
   * @param {Object} e
   * @param {Object} id
   * @memberof allUsers
   */
  change(e, id) {
    this.setState({ change: e.target.value });
    this.props.updateUser({ roleId: e.target.value }, id);
  }

  /**
   * @param {Object} userId 
   * @memberof allUsers
   */
  deleteUser(userId){
    this.props.deleteUser(userId);
    Materialize.toast('User deleted!', 3000);
  }
  /**
   * @returns {void} returns table
   * @memberof allUsers
   */
  render(){
    return (
      <div>
        <table className="bordered  responsive">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role ID</th>
              <th>Created date</th>
              <th>Updated date</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user =>
              <SingleUserComponent user={user} key={user.id} deleteUser={this.deleteUser} props={this.props} change={this.change}/>
            )}
          </tbody>
        </table>
      </div>
    )
  };
}

