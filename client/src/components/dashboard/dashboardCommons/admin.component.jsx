import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import jwtDecode from 'jwt-decode';
import Navbar from '../../commons/nav.component.js';
import Searchbar from '../../commons/searchbar.jsx';
import AllDocs from '../userDashboard/allDocs.component.jsx';
import Users from '../../dashboard/adminDashboard/usersView.component.js';
import Roles from '../../dashboard/adminDashboard/rolesView.component.js';
import MyDocs from '../userDashboard/myDocs.component.jsx';
import CreateDocument from '../../modals/createDocForm.component';
import * as userActions from '../../../actions/userManagement/getUsers.js';
import * as roleActions from '../../../actions/userManagement/getRoles.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.setEditDocument = this.setEditDocument.bind(this);
    this.setDeleteDocument = this.setDeleteDocument.bind(this);
    const token = window.localStorage.getItem('token');
    this.state = {
      AdminRoleId: 1,
      authUser: jwtDecode(token) || {},
    };
  }
  setEditDocument(document){
    console.log(document, 'to edit');
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
  componentWillMount() {
    const userId = this.state.authUser.userId || null
    this.props.actionsUser.viewUsers(userId);
    this.props.actionsRole.viewRoles(userId);
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
                <li className="tab"><Link to="#test4">My Docs</Link></li>
              </ul>
            </div>

            <div id="test1" className="tabContent col s12">
              <AllDocs document={this.props.documents} />
            </div>
            <div id="test2" className="tabContent col s12">
              <Users users={this.props.users} />
            </div>
            <div id="test3" className="tabContent col s12">
              <Roles roles={this.props.roles} />
            </div>
            <div id="test4" className="tabContent col s12">
              <MyDocs document={this.props.documents} setEditDocument={this.setEditDocument} setDeleteDocument={this.setDeleteDocument} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default Dashboard;
const mapStoreToProps = (state) => {
  return {
    users: state.userReducer,
    roles: state.roleReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    EditDocument: (documentDetails, documentId) => dispatch(EditDocument(documentDetails, documentId)),
    DeleteDocument: (documentId) => dispatch(DeleteDocument(documentId)),
    actionsUser: bindActionCreators(userActions, dispatch),
    actionsRole: bindActionCreators(roleActions, dispatch)
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard);
