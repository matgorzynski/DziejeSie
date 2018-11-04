import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    var dane = {Login:"dupkaaaaaaaaaa", Password:"dupaaaaaaaaaaaa"};
    
    fetch('http://matgorzynski.hostingasp.pl/user/login', {
      method: 'POST',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dane),
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response))
    );

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Enter username</label>
        <br />
        <input id="username" name="username" type="text" />

        <br />

        <label htmlFor="password">Enter password</label>
        <br />
        <input id="password" name="password" type="password" />

        <br />
        <button>Send data!</button>
      </form>
    );
  }
}

export default Login;