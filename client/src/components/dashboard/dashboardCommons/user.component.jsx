import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import Navbar from '../../commons/nav.component.js';
import SubNavBar from '../../commons/subNavBar.jsx';
import AllDocs from '../../dashboard/userDashboard/allDocs.component.jsx';
import PrivateDocs from '../../dashboard/userDashboard/privateDocs.component.jsx';
import PublicDocs from '../../dashboard/userDashboard/publicDocs.component.jsx';
import RoleDocs from '../../dashboard/userDashboard/roleDocs.component.jsx';
import MyDocs from '../../dashboard/userDashboard/myDocs.component.jsx';
import CreateDocument from '../../modals/createDocForm.component';
import EditDocument from '../../../actions/documentManagement/editDocument';
import DeleteDocument from '../../../actions/documentManagement/deleteDocuments';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.setEditDocument = this.setEditDocument.bind(this);
    this.setDeleteDocument = this.setDeleteDocument.bind(this);
    this.setViewDocument = this.setViewDocument.bind(this);
    this.state = {};
  }
  setViewDocument(document) {
    this.setState({
      viewTitle: document.title,
      viewDocument: document.content,
      documentId: document.id
    });
  }
  setEditDocument(document) {
    this.setState({
      editDocument: document,
      documentId: document.id
    });
    browserHistory.push('/dashboard');
  }
  setDeleteDocument(documentId) {
    this.props.DeleteDocument(documentId);
    browserHistory.push('/dashboard');
  }
  componentDidMount() {
    $('ul.tabs').tabs();
  }
  render() {

    return (
      <div>
        {/*<div id="modalEdit" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Edit Document</h4>
            <CreateDocument document={this.state.editDocument || null} documentId={this.state.documentId || null} onEdit={this.props.EditDocument} />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Cancel</a>
          </div>
        </div>*/}
        <div id="modalView" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4 className="center">View Document</h4>
            <h5>Title</h5>
            <div>{ this.state.viewTitle }</div>
            <h5>Content</h5>            
            <div dangerouslySetInnerHTML={{ __html: this.state.viewDocument}} />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Cancel</a>
          </div>
        </div>

        <div className="mainContainer">
          <div className="bg"></div>
          <Navbar />
          <SubNavBar />
          <div className="row">
            <div className="tabRow">
              <ul className="tabs tabs-fixed-width">
                <li className="tab"><Link to="#test1" className="active">All Docs</Link>
                </li>
                {/*<li className="tab"><Link to="#test2">Private Docs</Link></li>*/}
                <li className="tab"><Link to="#test3">Public Docs</Link></li>
                <li className="tab"><Link to="#test4">Role Docs</Link></li>
                <li className="tab"><Link to="#test5">My Docs</Link></li>
              </ul>
            </div>
            <div id="test1" className="tabContent col s12">
              <AllDocs document={this.props.documents} setEditDocument={this.setEditDocument} setViewDocument={this.setViewDocument} setDeleteDocument={this.setDeleteDocument} name="jezzuzzzz" />
            </div>
            {/*<div id="test2" className="tabContent col s12">
              <PrivateDocs document={this.props.documents} setEditDocument={this.setEditDocument} setViewDocument={this.setViewDocument} setDeleteDocument={this.setDeleteDocument} />
            </div>*/}
            <div id="test3" className="tabContent col s12">
              <PublicDocs document={this.props.documents} setViewDocument={this.setViewDocument} />
            </div>
            <div id="test4" className="tabContent col s12">
              <RoleDocs document={this.props.documents} setViewDocument={this.setViewDocument} />
            </div>
            <div id="test5" className="tabContent col s12">
              <MyDocs document={this.props.documents} setEditDocument={this.setEditDocument} setViewDocument={this.setViewDocument} setDeleteDocument={this.setDeleteDocument} />
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
