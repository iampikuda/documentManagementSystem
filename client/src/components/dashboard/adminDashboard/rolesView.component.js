import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';

/**
 * @param {Object} roles 
 * @param {Object} index 
 * @returns {void} returns table row
 */
const SingleRoles = (roles, index) => {
  return (
    <tr className="hoverable" key={index}>
      <td>{roles.id}</td>
      <td>{roles.title}</td>
      <td>{(roles.createdAt).slice(0, 10)}</td>
      <td>{(roles.updatedAt).slice(0, 10)}</td>
    </tr >
  );
}
let rolesList = [];
/**
 * @param {Object} props 
 * @returns {void} return table
 */
const RoleView = (props) => {
  if (props.roles !== undefined) {
    rolesList = props.roles;
  }
  return (
    <div>
      <table id="roletable" className="bordered  responsive">
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