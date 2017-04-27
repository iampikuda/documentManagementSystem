import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import Navbar from '../nav.component.js';
import Searchbar from '../containers/searchbar.jsx';



class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.setEditDocument = this.setEditDocument.bind(this);
    this.setDeleteDocument = this.setDeleteDocument.bind(this);
    this.state = {};
  }
  setEditDocument(document){
    console.log(document, 'to edit');
    this.setState({
      editDocument: document,
      documentId: document.id
    });
  }
  setDeleteDocument(documentId) {
    this.props.DeleteDocument(documentId);
  }
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {
    return (
      <div>
        <div className="mainContainer">
          <div className="bg"></div>
          <Navbar />
          <Searchbar />
          <div className="row">
            <div className="tabRow">
              <ul className="tabs tabs-fixed-width">
                <li className="tab"><Link to="#test1" className="active">All Docs</Link></li>
                <li className="tab"><Link to="#test2">Private Docs</Link></li>
              </ul>
            </div>

            <div id="test1" className="tabContent col s12">
              <UserDocs document={this.props.documents} setEditDocument={this.setEditDocument} setDeleteDocument={this.setDeleteDocument} name="jezzuzzzz"/>
            </div>
            <div id="test2" className="tabContent col s12">
              <PrivateDocs document={this.props.documents} setEditDocument={this.setEditDocument} setDeleteDocument={this.setDeleteDocument} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default Dashboard;
const mapDispatchToProps = (dispatch) => {
  return {
    EditDocument: (documentDetails, documentId) => dispatch(EditDocument(documentDetails, documentId)),
    DeleteDocument: (documentId) => dispatch(DeleteDocument(documentId))
  };
};
export default connect(null, mapDispatchToProps)(Dashboard);
