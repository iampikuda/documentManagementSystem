import React, { Component } from 'react';
import { Link } from 'react-router';
import CreateRole from './createRoleForm.component.jsx'

/**
 * Add role page
 * @class AddRole
 * @extends {Component}
 */
class AddRole extends Component {
  /**
   * Creates an instance of AddRole.
   * @memberof AddRole
   */
  constructor() {
    super();
  }
  /**
   * @memberof AddRole
   */
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
  /**
   * @returns {void} returns role modal
   * @memberof AddRole
   */
  render() {
    return (
      <div className="inline">
        <Link data-target="modalRole" id="createDoc" className="waves-effect waves-light btn-large createDoc">
          <i className="material-icons left">add_circle_outline</i>
          Add Role
          </Link>
        <div id="modalRole" className="modal modal-fixed-footer">
          <div className="modal-content">
            <h4>Create a Role</h4>
            <CreateRole />
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
          </div>
        </div>
      </div>
    )
  }
}

export default AddRole;