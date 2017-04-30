import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { bindActionCreators } from 'redux';
import Navbar from '../../commons/nav.component.js';
import Searchbar from '../../commons/searchbar.jsx';
import AdminDashboard from './admin.component.jsx';
import UserDashboard from './user.component.jsx';
import * as docActions from '../../../actions/documentManagement/readDocument.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('token');
    this.state = {
      AdminRoleId: 1,
      authUser: jwtDecode(token) || {},
    };
  }

  componentWillMount() {
    const userId = this.state.authUser.userId || null
    this.props.actionsDoc.viewUserDocuments(userId);
  }

  render() {
    const roleId = this.state.authUser.roleId || null
    return (roleId === this.state.AdminRoleId) ?
      <div>
        <AdminDashboard documents={this.props.documents} users={this.props.users} roles={this.props.roles}/>
      </div> :
      <div>
        <UserDashboard documents={this.props.documents} />
      </div>
  }
}

const mapStoreToProps = (state) => {
  return {
    documents: state.documentReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionsDoc: bindActionCreators(docActions, dispatch)
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard);
