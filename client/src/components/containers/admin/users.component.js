import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
// import { Pagination } from 'react-materialize';
import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
// import Search from '../Search';
// import User from './User';
// import UserApi from '../../../utils/UserApi';
// import { loadUsers } from '../../../actions/Users';


const token = window.localStorage.getItem('token');
const Users = (props) => {
  let userList;
  console.log('[][][][][][][][][][][][][]', props);
};

export default Users;
// const mapStateToProps = (state, ownProps) => {
//   return {
//     users: state.users
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadUsers: bindActionCreators(userActions, dispatch)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Users);