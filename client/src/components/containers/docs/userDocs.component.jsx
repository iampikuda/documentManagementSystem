import React, { Component } from 'react';

const UserDocs = (props) => {
  let documentList;
  console.log('==++++++++++', props);
  if (props.document.document !== undefined) {
    let docs = props.document.document.data.document;
    if (docs === undefined){
      docs = props.document.document.data.documents;
    }
    documentList = docs.map((document) => {
      console.log(document);
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
              <th>Author</th>
              <th>Published date</th>
              <th>Updated date</th>
          </tr>
        </thead>
        <tbody>
          { documentList }
        </tbody>
      </table>
    </div>
  )
}


const SingleDocument = (props) => {
  const { document } = props
  return (
    <tr className="hoverable">
      <td>{ document.title }</td>
      <td>{ document.access }</td>
      <td>{ document.content }</td>
      {/*<td>{`${document.User.lastName} ${document.User.firstName}`}</td>*/}
      <td>{ (document.createdAt).slice(0, 10) }</td>
      <td>{ (document.updatedAt).slice(0, 10) }</td>
    </tr>
  );
}

export default UserDocs;