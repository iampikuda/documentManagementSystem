import React, { Component } from 'react';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import AddDoc from '../addModals/addDoc.component.jsx';
import AddUser from '../addModals/addUser.component.jsx';
import AddRole from '../addModals/addRole.component.jsx';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('token');
    this.state = {
      selectValue: 'users',
      AdminRoleId: 1,
      authUser: jwtDecode(token) || {},
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  componentDidMount() {
    const userId = this.state.authUser.userId || null
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrainWidth: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    });
  }

  render() {
    const roleId = this.state.authUser.roleId || null
    var message = 'You selected ' + this.state.selectValue;
    return (roleId === this.state.AdminRoleId) ?
      <nav id="nav">
        <div className="nav-wrapper">
          <AddUser />
          <AddRole />
          <div className="searchBox">
            <i className="material-icons">search</i>
            <input type="text" id="searchInput" placeholder="....SEARCH"></input>
            <div className="dropdown">
              <select value={this.state.selectValue}
                onChange={this.handleChange}>
                <option value="users">USERS</option>
                <option value="documents">DOCUMENTS</option>
              </select>
            </div>

          </div>



        </div>
      </nav> :
      <nav id="nav">
        <div className="nav-wrapper">

          <AddDoc />

          <div className="searchBox">
            <i className="material-icons">search</i>
            <input type="text" id="searchInput" placeholder="....SEARCH"></input>
            <div className="dropdown">
              <select value={this.state.selectValue}
                onChange={this.handleChange}>
                <option value="users">USERS</option>
                <option value="documents">DOCUMENTS</option>
              </select>
            </div>

          </div>



        </div>
      </nav>
  }
}
export default Searchbar;