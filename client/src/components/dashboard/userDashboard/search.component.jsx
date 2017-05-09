import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

/**
 * Search component
 * @param {Object} props 
 * @returns {void} returns search table
 */
const Search = (props) => {
  /**
   * @param {Object} document 
   * @param {Integer} index 
   * @returns {void} returns table row
   */
  const SingleDocument = (document, index) => {
    return (
      <tr className="hoverable" key={index} >
        <td>{document.title}</td>
        <td>{document.access}</td>
        <td className="truncate">
          <a href="#modalView"
            dangerouslySetInnerHTML={{ __html: document.content}}
            onClick={() => { props.setViewDocument(document); }}/>
        </td>
        <td>{`${document.User.lastName} ${document.User.firstName}`}</td>
        <td>{(document.createdAt).slice(0, 10)}</td>
        <td>{(document.updatedAt).slice(0, 10)}</td>
        <td>
          <a className="modal-trigger green-text" 
            href="#modalEdit"
            onClick={() => { props.setEditDocument(document);}}>
            <i className="material-icons">edit</i>
          </a>
        </td>
        <td>
          <a className="red-text" href="#"
            onClick={() => { props.setDeleteDocument(document.id);}}>
            <i className="material-icons">delete</i>
          </a>
        </td>
      </tr >
    );
  }
  /**
   * @param {Object} users 
   * @param {Integer} index 
   * @returns {void} returns table row
   */
  const SingleUsers = (users, index) => {
    return (
      <tr className="hoverable" key={index}>
        <td>{users.firstName}</td>
        <td>{users.lastName}</td>
        <td>{users.email}</td>
        <td>{users.roleId}</td>
        <td>
          <a className="modal-trigger green-text" href="#modalEdit"
            onClick={() => { props.setEditusers(users);}}>
            <i className="material-icons">edit</i>
          </a>
        </td>
        <td>
          <a className="red-text" href="#"
          onClick={() => { props.setDeleteusers(users.id);}}>
          <i className="material-icons">delete</i>
        </a></td>
      </tr >
    );
  }
  const token = window.localStorage.getItem('token');
  let searchList = [];
  if (props.view === true) {
    if (props.document.search !== undefined) {
      let docs = props.document.search.data.document;
      if (docs === undefined) {
        docs = props.document.search.data.documents;
      }
      searchList = docs;
    }
  } else if (props.view === false){
    if (props.users.search !== undefined) {
      let user = props.users.search.data.user;
      if (user === undefined) {
        user = props.users.search.data.users;
      }
      searchList = user;
    }
  }
  return (props.view === true) ?

    <div>
      <table className="bordered responsive">
        <thead>
          <tr>
            <th>Title</th>
            <th>Access</th>
            <th>Content</th>
            <th>Owner</th>
            <th>Published date</th>
            <th>Updated date</th>
          </tr>
        </thead>
        <tbody>
          {searchList.map(SingleDocument)}
        </tbody>
      </table>
    </div> :
    <div>
      <table className="bordered responsive">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role ID</th>
          </tr>
        </thead>
        <tbody>
          {searchList.map(SingleUsers)}
        </tbody>
      </table>
    </div>
}

export default Search;