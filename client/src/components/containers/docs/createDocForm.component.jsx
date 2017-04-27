import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import newDocument from '../../../actions/documentManagement/newDocument.js';


const ResponseMessage = (props) => {
  if (props.status === 'success') {
    return (
      <div>
        Document Created
      </div>
    );
  } else if (props.status === 'failed') {
    return (
      <div>
        Document not Created
      </div>
    );
  } else {
    return (<span />);
  }
};

export class CreateDocument extends Component {
  constructor(props) {
      super(props);
      const token = (window.localStorage.getItem('token'));
      if (token) {
        this.state = { id: jwtDecode(token).userId, email: jwtDecode(token).email};
      }
      this.state = {
        title: props.document ? props.document.title :  '',
        content: props.document ? props.document.content : '',
        access: props.document ? props.document.access : '',
        status: props.document ? props.document.status : '',
        ownwerId: this.state.id
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  componentWillReceiveProps(nextProps) {
      if (nextProps.status === 'success') {
        browserHistory.push('/dashboard');
      }
      if (nextProps.document) {
        this.setState({
          title: nextProps.document.title,
          content: nextProps.document.content,
          access: nextProps.document.access,
          status: nextProps.document.status
        });
      }
    }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.CreateDocument(this.state);
  }

  render() {
    return  (
      <div>
        <div>
          <div className='row'>
            <form className='col s12' onSubmit={this.props.onEdit ? () => { this.props.onEdit(this.state, this.props.documentId) } : this.onSubmit}>
              <div className='row'>
                <div className='input-field col s12'>
                  <input
                    value={this.state.title}
                    onChange={this.onChange}
                    name='title'
                    id='title'
                    type='text'
                    className='validate'
                    required />
                  <label htmlFor='title'>Title</label>
                </div>
              </div>
              <div className='row'>
                <div className='input-field col s12'>
                  <textarea
                    value={this.state.content}
                    onChange={this.onChange}
                    name='content'
                    id='content'
                    type='password'
                    className='validate materialize-textarea'
                    required>
                  </textarea>
                  <label htmlFor='password'>Content</label>
                </div>
              </div>
              <div className='col m3 s12'>
                <select
                  name='access'
                  id='access'
                  onChange={this.onChange}
                  value={this.state.value}
                  className='browser-default'
                  required
                >
                  <option value='' disabled selected>Select Access Type</option>
                  <option value='public'>Public</option>
                  <option value='private'>Private</option>
                  <option value='role'>Role</option>
                </select>
              </div>
              <button className='btn waves-effect waves-light center auth-button' type='submit' name='action'>Save
              <i className='material-icons right'></i>
              </button>
              <ResponseMessage status={this.props.status} />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStoreToProps = (state) => {
  return {
    status: state.documentReducer.createStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateDocument: documentDetails => dispatch(newDocument(documentDetails)),
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CreateDocument);