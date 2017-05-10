import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import createRoleAction from '../../actions/roleManagement/newRole';


/**
 * @export
 * @class CreateRole
 * @extends {Component}
 */
export class CreateRole extends Component {
  /**
   * Creates an instance of CreateRole.
   * @param {Object} props 
   * @memberof CreateRole
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
   * @memberof CreateRole
   */
  componentWillMount() {
    if (!window.localStorage.getItem('token')) {
      browserHistory.push('/dashboard');
    }
  }

  /**
   * @param {Object} nextProps 
   * @memberof CreateRole
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'success') {
      browserHistory.push('/dashboard');
    }
  }

  /**
   * @param {Object} event
   * @memberof CreateRole
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @param {Object} event
   * @memberof CreateRole
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.CreateRole(this.state);
  }

  /**
   * @returns {void} returns form
   * @memberof CreateRole
   */
  render() {
    return  (
      <div>
        <div>
         <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
              <div className="input-field col s12">
                <input
                value={this.state.title}
                onChange={this.handleChange}
                name="title"
                id="title"
                type="text"
                className="validate"
                required />
                <label  htmlFor="title">Title</label>
              </div>
            </div>
            <button
              className="btn waves-effect waves-light center auth-button"
              type="submit"
              name="action">
              Save
              <i className="material-icons right"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

CreateRole.PropTypes = {
  role: PropTypes.object.isRequired,
};

/**
 * @param {Object} dispatch 
 * @returns {Object} returns object
 */
const mapDispatchToProps = (dispatch) => {
  return {
    CreateRole: roleDetails => dispatch(createRoleAction(roleDetails)),
  };
};

export default connect(null, mapDispatchToProps)(CreateRole);