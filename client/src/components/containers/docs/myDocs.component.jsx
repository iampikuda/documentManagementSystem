import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

let myId;
const MyDocs = (props) => {
  const token = window.localStorage.getItem('token');
  myId = jwtDecode(token).userId;
  let documentList;

  if (props.document.document !== undefined) {
    documentList = props.document.document.data.document
      .filter((document) => {
        return document.ownerId === myId;
      })
      .map((document) => {
        return (
          <SingleDocument document={document} key={document.id} />
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
      <td>{(document.createdAt).slice(0, 10)}</td>
      <td>{(document.updatedAt).slice(0, 10)}</td>
    </tr>
  );
}

export default MyDocs;