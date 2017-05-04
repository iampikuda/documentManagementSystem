import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';


let props;
const AllDocs = (props) => {
  const SingleDocument = (document, index) => {
    return (
      <tr className="hoverable" key={index} >
        <td>{document.title}</td>
        <td>{document.access}</td>
        <td className="truncate"><a href="#modalView" dangerouslySetInnerHTML={{ __html: document.content}} onClick={() => { props.setViewDocument(document); }} /></td>
        <td>{`${document.User.lastName} ${document.User.firstName}`}</td>
        <td>{(document.createdAt).slice(0, 10)}</td>
        <td>{(document.updatedAt).slice(0, 10)}</td>
        {/*</a>*/}
        {/*<td><a className="modal-trigger green-text" href="#modalEdit" onClick={() => { props.setEditDocument(document); }}><i className="material-icons">edit</i></a></td>
      <td><a className="red-text" href="#" onClick={() => { props.setDeleteDocument(document.id); }} > <i className="material-icons">delete</i></a></td>*/}
      </tr >
    );
  }
  let documentList = [];
  const token = window.localStorage.getItem('token');
  if (props.document.document !== undefined) {
    let docs = props.document.document.data.document;
    if (docs === undefined) {
      docs = props.document.document.data.documents;
    }
    documentList = docs;
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
          {documentList.map(SingleDocument)}
        </tbody>
      </table>
    </div>
  )
}

export default AllDocs;