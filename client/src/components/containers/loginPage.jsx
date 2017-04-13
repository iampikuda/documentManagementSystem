import React, { Component } from 'react';
export default class LoginPage extends Component {
  constructor(){
    super();
    this.state = {
      email: null
    };
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput(event){
    this.setState({
      email: event.target.value
    })
  }
  render(){
    return (
          <div>
            <form>
              <h3>Login</h3>
              <p>{this.state.email}</p>
              <label>EMAIL</label>
              <input type="text" onChange={this.handleInput} value={this.state.email} name="email"/>
              <label>PASSWORD</label>
              <input type="text" value={this.state.password} name="password"/>
              <button type="submit">Login</button>
            </form>
          </div>
    );
  }
}