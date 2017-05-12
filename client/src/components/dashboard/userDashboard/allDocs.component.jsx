import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';


/**
 * All document component
 * @param {Object} props 
 * @returns {void} returns all document table
 */
const AllDocs = (props) => {
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
          onClick={() => { props.setViewDocument(document); }} />
        </td>
        <td>{`${document.User.lastName} ${document.User.firstName}`}</td>
        <td>{(document.createdAt).slice(0, 10)}</td>
        <td>{(document.updatedAt).slice(0, 10)}</td>
      </tr >
    );
  }
  let documentList = [];
  const token = window.localStorage.getItem('token');
  if (props.document !== undefined) {
    let docs = props.document;
    if (typeof(docs[0]) === Object) {
      docs = props.document[0];
    }
    documentList = docs;
  }
  console.log(documentList,'documentlist');
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