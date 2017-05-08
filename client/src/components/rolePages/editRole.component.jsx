import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from 'react';
import Navbar from '../common/nav.component';
import SearchBar from '../common/searchbar.component'
import editRoleAction from '../../actions/roleManagement/editRole.js';
import viewRole from '../../actions/roleManagement/viewRole.js';

/**
 * Edit role component
 * @class EditRole
 * @extends {Component}
 */
class EditRole extends Component {
  /**
   * Creates an instance of EditRole.
   * @param {any} props
   * @memberof EditRole
   */
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * @memberof EditRole
   */
  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/');
    }
    const token = window.localStorage.getItem('token');
    if (token) {
      this.props.viewRole(token, this.props.params.id);
    }
  }

  /**
   * @param {Object} nextProps 
   * @memberof EditRole
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.role.title,
    });
    if (nextProps.status === 'success') {
      browserHistory.push('/app/dashboard');
    }
  }

  /**
   * @param {any} event 
   * @memberof EditRole
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {any} event 
   * @memberof EditRole
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.EditRole(
      this.state,
      localStorage.getItem('token'),
      this.props.params.id
      );
  }

  /**
   * @returns {void} returns edit role page
   * @memberof EditRole
   */
  render() {
    return (
      <div className="row col s12">
        <Navbar />
        <SearchBar />
        <div className="col s12 ">
          <div className="row "><h4>Edit Role</h4></div>
          <form onSubmit={this.handleSubmit} className="panel">
            <div className="field row">
              <div className="col m9 s12 document-name-field">
                <input
                  type="text" name="title"
                  id="title"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </div>
            </div>
            <div className="field row">
              <button className="btn" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


EditRole.PropTypes = {
  role: PropTypes.object.isRequired,
};

EditRole.contextTypes = {
  router: PropTypes.object
};

/**
 * @param {Object} state 
 * @param {Object} ownProps 
 * @returns {Object} returns object
 */
const mapStoreToProps = (state, ownProps) => {
  return {
    role: state.roleReducer.role,
    status: state.roleReducer.status
  };
};

/**
 * @param {any} dispatch 
 * @returns {Object} returns object
 */
const mapDispatchToProps = (dispatch) => {
  return {
    EditRole: (roleDetails, token, roleid) => dispatch(editRoleAction(roleDetails, token, roleid)),
    viewRole: (token, roleid) => dispatch(viewRole(token, roleid))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(EditRole);