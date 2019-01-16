import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
// import axios from 'axios';

class Login extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  
    this.state = {
      redirect: false,
      Login: '',
      Password: '',
      alertMessage: '',
      show: false
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
    }).then(response => 
        response.json().then(data => ({
            data: data,
            status: response.status
      })
      ).then(res => {
          console.log(res.status, res.data);
          if (res.data.errorCode >= 0) {
            this.setState({
              alertMessage: res.data.desc,
              show: true
            })
          } else {
            this.setState({
              redirect: true
            })
            localStorage.setItem('userName', this.state.Login);
            localStorage.setItem('userId', res.data.iduser);
          }
      })
    );
  }

  handleChange(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }


  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/result/',
        state: { message: "Udało się zalogować!" }
      }} />
    }
  }

  showAlert() {
  if(this.state.show) {
    return (
      <Alert bsStyle="danger">
        <p align="center"><strong>Coś poszło nie tak!</strong> {this.state.alertMessage}</p>
      </Alert>
      )
    }
  }

  render() {
    return (
      <div>
        {this.showAlert()}
        {this.renderRedirect()}
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
      </div>
    );
  }
  
}

export default Login;