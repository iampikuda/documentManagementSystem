import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';

let usersList = [];
/**
 * @param {Object} props 
 * @returns {void} return table
 */
const UserDocs = (props) => {
  // console.log(props, 'porpospospopd');
  /**
   * @param {Object} roles 
   * @param {Object} index 
   * @returns {void} returns table row
   */
  const SingleUsers = (users, index) => {
    return (
      <tr className="hoverable" key={index}>
        <td>{users.firstName}</td>
        <td>{users.lastName}</td>
        <td>{users.email}</td>
        <td>
          {
            (users.id !== 1) ?
              <select style={{ display: 'block' }} defaultValue={users.roleId} onChange={(e) => props.setUserRole(e, users.id)}>
                {
                  props.roles.map(role => <option value={role.id} key={role.id}>{role.title}</option>)
                }
              </select>
              :
              'Super Admin'
          }

        </td>
        <td>{(users.createdAt).slice(0, 10)}</td>
        <td>{(users.updatedAt).slice(0, 10)}</td>
        <td>
          <a className="red-text" href="#"
          onClick={() => { 
            props.setDeleteUser(props.deleteUser, users.id);
            }}>
            <i className="material-icons">delete</i>
          </a>
        </td>
      </tr >
    );
  }
  if (props.users !== undefined) {
    usersList = props.users;
  }
  return (
    <div>
      <table className="bordered responsive">
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
          {usersList.map(SingleUsers)}
        </tbody>
      </table>
    </div>
  )
}

export default UserDocs;