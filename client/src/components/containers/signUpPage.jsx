import React, { Component } from 'react';

export default class signUpPage extends Component {
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
          <h3>SignUp</h3>
          <label>FIRST NAME</label>
          <input type="text"value={this.state.firstName} name="firstName" placeholder="first name"/>
          <label>LAST NAME</label>
          <input type="text" value={this.state.lastName} name="lastName" placeholder="last name"/>
          <label>EMAIL</label>
          <input type="text" onChange={this.handleInput} value={this.state.email} name="email" placeholder="email"/>
          <label>PASSWORD</label>
          <input type="text" value={this.state.password} name="password"/>
          <button type="submit">SignUp</button>
        </form>
      </div>
    );
  }
}
