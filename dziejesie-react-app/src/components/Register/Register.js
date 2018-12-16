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
      FisrtName: '',
      LastName: '',
      Address: '',
      PostCode: '',
      Town: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      Login: this.state.Login,
      Password: this.state.Password,
      ConfirmPassword: this.state.ConfirmPassword,
      email: this.state.Email,
      FisrtName: this.state.FisrtName,
      LastName: this.state.LastName,
      Address: this.state.Address,
      PostCode: this.state.PostCode,
      Town: this.state.Town
    };

    console.log(JSON.stringify(data));

    fetch('https://localhost:5001/user/register', {
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
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
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

        <label htmlFor="Email">Adres email:</label>
        <br />
        <input id="Email" name="Email" type="Email" value={this.state.Email} onChange={this.handleChange.bind(this)} />
		<br />
        <label htmlFor="FisrtName">Imię:</label>
        <br />
        <input id="FisrtName" name="FisrtName" type="FisrtName" value={this.state.FisrtName} onChange={this.handleChange.bind(this)} />

        <br />
        <label htmlFor="LastName">Nazwisko:</label>
        <br />
        <input id="LastName" name="LastName" type="LastName" value={this.state.LastName} onChange={this.handleChange.bind(this)} />

        <br />
        <label htmlFor="Address">Ulica:</label>
        <br />
        <input id="Address" name="Address" type="Address" value={this.state.Address} onChange={this.handleChange.bind(this)} />

        <br />
        <label htmlFor="PostCode">Kod Pocztowy:</label>
        <br />
        <input id="PostCode" name="PostCode" type="PostCode" value={this.state.PostCode} onChange={this.handleChange.bind(this)} />

        <br />
        <label htmlFor="Town">Miasto:</label>
        <br />
        <input id="Town" name="Town" type="Town" value={this.state.Town} onChange={this.handleChange.bind(this)} />

        <br />

        <button>Send data!</button>
      </form>
    );
  }
}

export default Register;