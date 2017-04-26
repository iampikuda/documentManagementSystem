import React, { Component } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Navbar from '../nav.component.js';
import Searchbar from '../containers/searchbar.jsx';
import AdminDashboard from './admin.component.jsx';
import UserDashboard from './user.component.jsx';
import { bindActionCreators } from 'redux';
import * as docActions from '../../actions/documentManagement/readDocument.js';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    const token = window.localStorage.getItem('token');
    this.state = {
      AdminRoleId: 1,
      authUser: jwtDecode(token) || {},
    }
  }

  componentWillMount() {
    const userId = this.state.authUser.userId || null
    this.props.actions.viewUserDocuments(userId);
    // console.log('***', userId);
  }

  render() {
    const roleId = this.state.authUser.roleId || null
    return (roleId === this.state.AdminRoleId) ?
      <AdminDashboard documents={this.props.documents} /> :
      <UserDashboard documents={this.props.documents} />
  }
}

const mapStoreToProps = (state) => {
  return {
    documents: state.documentReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(docActions, dispatch)
  }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Dashboard);
