import React, { Component } from 'react';

/**
 * Public document component
 * @param {Object} props 
 * @returns {void} returns public document table
 */
const PublicDocs = (props) => {
  /**
   * @param {Object} document 
   * @param {Integer} index 
   * @returns {void} returns table row
   */
  const SingleDocument = (document, index) => {
    return (
      <tr className="hoverable" key={index}>
        <td>{ document.title }</td>
        <td>{ document.access }</td>
        <td className="truncate"><a href="#modalView" dangerouslySetInnerHTML={{ __html: document.content}} onClick={() => { props.setViewDocument(document); }} /></td>
        <td>{`${document.User.lastName} ${document.User.firstName}`}</td>
        <td>{ (document.createdAt).slice(0, 10) }</td>
      </tr>
    );
  }
  let documentList = [];
  if (props.document.document !== undefined) {
    let docs = props.document.document.data.document;
    if (docs === undefined){
      docs = props.document.document.data.documents;
    }
    documentList = docs
    .filter((document) => {
      return document.access === 'public';
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
              <th>Author</th>
              <th>Published date</th>
          </tr>
        </thead>
        <tbody>
          { documentList.map(SingleDocument) }
        </tbody>
      </table>
    </div>
  )
}

export default PublicDocs;