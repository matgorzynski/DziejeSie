import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  
    this.state = {
      Email: '',
      Password: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      Email: this.state.Email,
      Password: this.state.Password
    }; 
    console.log(JSON.stringify(data));

    axios.post('http://matgorzynski.hostingasp.pl/user/login', data)
  .then(response => console.log('Success:', JSON.stringify(response))
  );
  }

  handleChange(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="Email">Email</label>
        <br />
        <input id="Email" name="Email" type="email" value={this.state.Email} onChange={this.handleChange.bind(this)} />

        <br />

        <label htmlFor="Password">Hasło</label>
        <br />
        <input id="Password" name="Password" type="password" value={this.state.Password} onChange={this.handleChange.bind(this)} />

        <br />
        <button>Send data!</button>
      </form>
    );
  }
}

export default Login;