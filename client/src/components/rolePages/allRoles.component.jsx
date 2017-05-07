import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';

/**
 * @param {any} {role} 
 * @returns {void} returns table row
 */
const SingleRole = ({role}) => {
  return (
    <tr className="hoverable">
      <td>{role.id}</td>
      <td>{role.title}</td>
      <td>{role.createdAt.slice(0, 10)}</td>
      <td>{role.updatedAt.slice(0, 10)}</td>
    </tr >
  );
}

/**
 * role view
 * @export
 * @class RoleView
 * @extends {Component}
 */
export default class RoleView extends Component {
  constructor(props){
    super(props);
    this.state = {
      roles: props.roles || []
    };
  }

  /**
   * @param {any} nextProps 
   * @memberof RoleView
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.roles){
      this.setState({
        roles: nextProps.roles
      });
    }
  }

  /**
   * @returns {void} returns role table
   * @memberof RoleView
   */
  render(){
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
            {this.state.roles.map(role =>
            <SingleRole role={role} key={role.id} />
            )}
          </tbody>
        </table>
      </div>
    )
  }
};
