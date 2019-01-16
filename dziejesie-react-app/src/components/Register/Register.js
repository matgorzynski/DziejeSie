import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  
    this.state = {
      Login: '',
      Password: '',
      ConfirmPassword: '',
      Email: '',
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {Login: this.state.Login, Password: this.state.Password, ConfirmPassword: this.state.ConfirmPassword, email: this.state.Email};
        
    console.log(JSON.stringify(data));

    fetch('http://matgorzynski.hostingasp.pl/user/register', {
      method: 'POST',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response))
    );

  }

  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="Login">Nazwa użytkownika</label>
        <br />
        <input id="Login" name="Login" type="text" value={this.state.Login} onChange={this.handleChange.bind(this)} />

        <br />

        <label htmlFor="Password">Hasło</label>
        <br />
        <input id="Password" name="Password" type="password" value={this.state.Password} onChange={this.handleChange.bind(this)} />

        <br />

        <label htmlFor="ConfirmPassword">Potwierdź hasło</label>
        <br />
        <input id="ConfirmPassword" name="ConfirmPassword" type="password" value={this.state.ConfirmPassword} onChange={this.handleChange.bind(this)} />

        <br />

        <label htmlFor="Email">Adres email</label>
        <br />
        <input id="Email" name="Email" type="Email" value={this.state.Email} onChange={this.handleChange.bind(this)} />

        <br />
        <button>Send data!</button>
      </form>
    );
  }
}

export default Register;