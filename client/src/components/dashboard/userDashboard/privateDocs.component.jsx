import React, { Component } from 'react';

/**
 * Private document component
 * @param {Object} props 
 * @returns {void} returns private document table
 */
const PrivateDocs = (props) => {
  let documentList= [];
  if (props.document.document !== undefined) {
    let docs = props.document.document.data.document;
    if (docs === undefined){
      docs = props.document.document.data.documents;
    }
    documentList = docs
    .filter((document) => {
      return document.access === 'private';
    })
    .map((document) => {
      return (
        <SingleDocument document={document} key={document.id} />
      )
    })
  }
  return (
    <div>
      <table className="bordered responsive">
        <thead>
          <tr>
              <th>Title</th>
              <th>Access</th>
              <th>Content</th>
              <th>Published date</th>
          </tr>
        </thead>
        <tbody>
          { documentList }
        </tbody>
      </table>
    </div>
  )
}

/**
 * @param {Object} document 
 * @param {Integer} index 
 * @returns {void} returns table row
 */
const SingleDocument = (props) => {
  const { document } = props
  return (
    <tr className="hoverable">
      <td>{ document.title }</td>
      <td>{ document.access }</td>
      <td>{ document.content }</td>
      <td>{ (document.createdAt).slice(0, 10) }</td>
    </tr>
  );
}

export default PrivateDocs;