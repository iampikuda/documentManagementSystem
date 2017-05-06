import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateUser from '../authPages/signUpPage.jsx';

class AddUser extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    $('.modal').modal({
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
      // ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      //   alert("Ready");
      //   console.log(modal, trigger);
      // },
      complete: function () {
        // window.location.reload();
      } // Callback for Modal close
    });
  }
  render() {
    return (
      <div className="inline">
        <Link data-target="modalUser" id="createUser" className="waves-effect waves-light btn-large createDoc">
          <i className="material-icons left">add_circle_outline</i>
          Add User
        </Link>
        <div id="modalUser" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Create a User</h4>
            <CreateUser />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
          </div>
        </div>
      </div>
    )
  }
}

export default AddUser;