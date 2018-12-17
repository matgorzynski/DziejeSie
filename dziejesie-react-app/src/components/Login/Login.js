import React, { Component } from 'react';
import axios from 'axios';

class Email extends Component {
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

    axios.post('http://matgorzynski.hostingasp.pl/user/login', { 
      Email: this.state.Email,
      Password: this.state.Password
    })
    .then(response => {
        console.log("Response: " + JSON.stringify(response));
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
        <label htmlFor="Email"> Email:</label>
        <br />
        <input id="Email" name="Email" type="text" value={this.state.Email} onChange={this.handleChange.bind(this)} />

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

export default Email;