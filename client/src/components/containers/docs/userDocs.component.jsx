import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';

let firstName;
const token = window.localStorage.getItem('token');
if (token) {
  firstName = jwtDecode(token).firstName;
}
const UserDocs = (props) => {
  let documentList;
  if (props.document.document !== undefined) {
    let docs = props.document.document.data.document;
    if (docs === undefined) {
      docs = props.document.document.data.documents;
    }
    documentList = docs.map((document) => {
      // console.log(document);
      return (
        <SingleDocument document={document} key={document.id}
          setEditDocument={props.setEditDocument} setDeleteDocument={props.setDeleteDocument} />
      )
    })
  }
  return (
    <div>
      <table className="bordered  responsive">
        <thead>
          <tr>
            <th>Title</th>
            <th>Access</th>
            <th>Content</th>
            <th>Author</th>
            <th>Published date</th>
            <th>Updated date</th>
          </tr>
        </thead>
        <tbody>
          {documentList}
        </tbody>
      </table>
    </div>
  )
}


const SingleDocument = (props) => {
  const { document } = props
  return (
    <tr className="hoverable">
      <td>{document.title}</td>
      <td>{document.access}</td>
      <td>{document.content}</td>
      <td>{`${document.User.lastName} ${document.User.firstName}`}</td>
      <td>{(document.createdAt).slice(0, 10)}</td>
      <td>{(document.updatedAt).slice(0, 10)}</td>
      <td><a className="modal-trigger green-text" href="#modal1" onClick={() => { props.setEditDocument(document); }}><i className="material-icons">edit</i></a></td>
    <td><a className="red-text" href="#" onClick={() => { props.setDeleteDocument(document.id); }} > <i className="material-icons">delete</i></a></td>
    </tr >
  );
}

export default UserDocs;