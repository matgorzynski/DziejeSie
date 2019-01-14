import React, { Component } from 'react';
// import axios from 'axios';

class Login extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  
    this.state = {
      Login: '',
      Password: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      Login: this.state.Login,
      Password: this.state.Password
    }
        
    fetch('http://matgorzynski.hostingasp.pl/user/login', {
      credentials: 'include',
      method: 'POST',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'VerySecureHeader': '',
      },
      body: JSON.stringify(data),
    })
    .then(res => {
      if (res.status === 200) {
        localStorage.setItem('userName', this.state.Login);
      }
      console.log('Response:', res.json());
    });
  }

  handleChange(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="Login">Login</label>
        <br />
        <input id="Login" name="Login" type="text" value={this.state.Login} onChange={this.handleChange.bind(this)} />

        <br />

        <label htmlFor="Password">Hasloo</label>
        <br />
        <input id="Password" name="Password" type="password" value={this.state.Password} onChange={this.handleChange.bind(this)} />

        <br />
        <button>Send data!</button>
      </form>
    );
  }
}

export default Login;