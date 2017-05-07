import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';

const SingleRoles = (roles, index) => {
  return (
    <tr className="hoverable" key={index}>
      <td>{roles.id}</td>
      <td>{roles.title}</td>
      <td>{(roles.createdAt).slice(0, 10)}</td>
      <td>{(roles.updatedAt).slice(0, 10)}</td>
      {/*<td><a className="modal-trigger green-text" href="#modalEdit" onClick={() => { props.setEditroles(roles); }}><i className="material-icons">edit</i></a></td>
      <td><a className="red-text" href="#" onClick={() => { props.setDeleteroles(roles.id); }} > <i className="material-icons">delete</i></a></td>*/}
    </tr >
  );
}
let rolesList = [];
/**
 * 
 * 
 * @param {any} props 
 * @returns 
 */
const RoleView = (props) => {
  if (props.roles.roles !== undefined) {
    rolesList = props.roles.roles.data.roles;
    if (rolesList === undefined) {
      rolesList = props.roles.roles.data.roles;
    }
  }
  return (
    <div>
      <table className="bordered  responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Created date</th>
            <th>Updated date</th>
          </tr>
        </thead>
        <tbody>
          {rolesList.map(SingleRoles)}
        </tbody>
      </table>
    </div>
  )
}

export default RoleView;