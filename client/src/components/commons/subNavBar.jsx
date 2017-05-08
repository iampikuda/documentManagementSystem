import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import AddDoc from '../modals/addDoc.component.jsx';
import AddUser from '../modals/addUser.component.jsx';

import searchUsers from '../../actions/userManagement/searchUsers.js';
import searchDocs from '../../actions/documentManagement/searchDocs.js';

/**
 * 
 * 
 * @class SubNavBar
 * @extends {Component}
 */
class SubNavBar extends Component {
  /**
   * Creates an instance of SubNavBar.
   * @param {any} props 
   * @memberof SubNavBar
   */
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('token');
    this.state = {
      database: 'users',
      query: '',
      AdminRoleId: 1,
      authUser: jwtDecode(token) || {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * Instantiates select button
   * @memberof SubNavBar
   */
  componentDidMount() {
    const userId = this.state.authUser.userId || null
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false,
      // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left',
      // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
    $('select').material_select();
  }
  /**
   * @param {any} event 
   * @memberof SubNavBar
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @param {any} event 
   * @memberof SubNavBar
   */
  onSubmit(event){
    event.preventDefault();
    if(this.state.database === 'documents') {
      this.props.DocSearch(this.state.query);
      this.props.handleSearchBarView(true);
    } else {
      this.props.UserSearch(this.state.query);
      this.props.handleSearchBarView(false);
    }
  }

  /**
   * @returns {Object} object
   * @memberof SubNavBar
   */
  render() {
    const roleId = this.state.authUser.roleId || null
    return (roleId === this.state.AdminRoleId) ?
      <nav id="nav">
        <div className="nav-wrapper">
          <AddDoc />
          <AddUser />

          <form className="searchForm" onSubmit={this.onSubmit}>
            <div className="searchBox">
              <i className="material-icons">search</i>
              <input
                value={this.state.query}
                onChange={this.onChange}
                name="query"
                type="text"
                id="searchInput"
                placeholder="....SEARCH"
                required />
              <div className="dropdown">
                <select
                  required
                  name="database"
                  id="database"
                  value={this.state.database}
                  onChange={this.onChange}
                  className="browser-default"
                  >
                  <option value="users">USERS</option>
                  <option value="documents">DOCUMENTS</option>
                </select>
                <input type="submit" value="Submit" className="displayNone" />                
              </div>
            </div>
          </form>
        </div>
      </nav> :
      <nav id="nav">
        <div className="nav-wrapper">

          <AddDoc />

          <form className="searchForm" onSubmit={this.onSubmit}>
            <div className="searchBox">
              <i className="material-icons">search</i>
              <input
                value={this.state.query}
                onChange={this.onChange}
                name="query"
                type="text"
                id="searchInput"
                placeholder="....SEARCH"
                required />
              <div className="dropdown">
                <select
                  name="database"
                  id="database"
                  value={this.state.database}
                  onChange={this.onChange}
                  className="browser-default"
                  required
                  >
                  <option value="users">USERS</option>
                  <option value="documents">DOCUMENTS</option>
                </select>
              </div>
              <input type="submit" value="Submit" className="displayNone" />
            </div>
          </form>



        </div>
      </nav>
  }
}
/**
 * @param {any} dispatch
 * @returns {object} object
 */
const mapDispatchToProps = (dispatch) => {
  return {
    UserSearch: query => dispatch(searchUsers(query)),
    DocSearch: query => dispatch(searchDocs(query))
  };
};

export default connect(null, mapDispatchToProps)(SubNavBar);