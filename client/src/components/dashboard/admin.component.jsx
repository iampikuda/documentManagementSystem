import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import Navbar from '../nav.component.js';
import Searchbar from '../containers/searchbar.jsx';
import UserDocs from '../containers/docs/userDocs.component.jsx';
import Users from '../containers/admin/users.component.js';
import Roles from '../containers/admin/roles.component.js';


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
                <li className="tab"><Link to="#test2">Users</Link></li>
                <li className="tab"><Link to="#test3">Roles</Link></li>
              </ul>
            </div>

            <div id="test1" className="tabContent col s12">
              <UserDocs document={this.props.documents} />
            </div>
            <div id="test2" className="tabContent col s12">
              <Users user={this.props.users} />
            </div>
            {/*<div id="test3" className="tabContent col s12">
              <Roles document={this.props.documents} />
            </div>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
// const mapDispatchToProps = (dispatch) => {
//   return {
//     EditDocument: (documentDetails, documentId) => dispatch(EditDocument(documentDetails, documentId)),
//     DeleteDocument: (documentId) => dispatch(DeleteDocument(documentId))
//   };
// };
// export default connect(null, mapDispatchToProps)(Dashboard);
