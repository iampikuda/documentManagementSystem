import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { bindActionCreators } from 'redux';
import Navbar from '../../commons/nav.component.js';
import SubNavBar from '../../commons/subNavBar.jsx';
import AdminDashboard from './admin.component.jsx';
import UserDashboard from './user.component.jsx';
import * as docActions from
'../../../actions/documentManagement/readDocument.js';

class IndexDashboard extends Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('token');
    this.state = {
      AdminRoleId: 1,
      authUser: jwtDecode(token) || {},
    };
  }

  componentWillMount() {
    this.props.actionsDoc.viewUserDocuments();
  }

  componentWillReceiveProps(nextProps){
    const keys = ['users', 'documents', 'roles'];
    keys.forEach(key=>{
      if(nextProps[key]){
        this.setState({
          [key]: nextProps[key]
        });
      }
    });
  }
  render() {
    const roleId = this.state.authUser.roleId || null
    return (roleId === this.state.AdminRoleId) ?
      <div>
        <AdminDashboard
          pagination={this.props.actionsDoc.viewUserDocuments}
          documents={this.props.documents}
          documentsSearch={this.props.documentsSearch}
          usersSearch={this.props.usersSearch}
          users={this.props.users}
          roles={this.props.roles} />
      </div> :
      <div>
        <UserDashboard
          pagination={this.props.actionsDoc.viewUserDocuments}
          documentsSearch={this.props.documentsSearch}
          usersSearch={this.props.usersSearch}
          documents={this.props.documents}
          users={this.props.users} />
      </div>
  }
}

/**
 * @param {Object} state 
 * @returns {Object} returns object
 */
const mapStoreToProps = (state) => {
  return {
    documents: state.documentReducer.document,
    users: state.userReducer.users,
    documentsSearch: state.documentReducer.search,
    usersSearch: state.userReducer.search,
    roles: state.roleReducer.roles
  };
};

/**
 * @param {Object} dispatch 
 * @returns {Object} returns object
 */
const mapDispatchToProps = (dispatch) => {
  return {
    actionsDoc: bindActionCreators(docActions, dispatch),
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(IndexDashboard);
