import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';


const MyDocs = (props) => {
  const SingleDocument = (document, index) => {
    return (
      <tr className="hoverable" key={index}>
        <td>{document.title}</td>
        <td>{document.access}</td>
        <td className="truncate"><a href="#modalView" dangerouslySetInnerHTML={{ __html: document.content }} onClick={() => { props.setViewDocument(document); }} /></td>
        <td>{(document.createdAt).slice(0, 10)}</td>
        <td>{(document.updatedAt).slice(0, 10)}</td>
      </tr>
    );
  }
  const token = window.localStorage.getItem('token');
  const myId = jwtDecode(token).userId;
  let documentList = [];

  if (props.document.document !== undefined) {
    let docs = props.document.document.data.document;
    if (docs === undefined){
      docs = props.document.document.data.documents;
    }
    documentList = docs
      .filter((document) => {
        return document.ownerId === myId;
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

export default MyDocs;