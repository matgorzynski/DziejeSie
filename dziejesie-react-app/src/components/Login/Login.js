import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class Login extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          login: '',
          password: ''
        };
      }

      handleChange(e) {
        this.setState({ value: e.target.value });
      }

      handleClick() {
          fetch('http://matgorzynski.hostingasp.pl/user/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstParam: this.state.login,
              secondParam: this.state.password,
            }),
          }).then((response) => response.json())
              .then((responseJson) => {
                return responseJson;
              })
              .catch((error) => {
                console.error(error);
              });
      }

      render() {
        return (
        <div>
          <form>
            <FormGroup
              controlId="formBasicText"
            >
              <ControlLabel>Zaloguj się</ControlLabel>
              <FormControl
                type="text"
                value={this.state.login}
                placeholder="Login"
                onChange={this.handleChange}
              />
              <FormControl
                type="text"
                value={this.state.password}
                placeholder="Hasło"
                onChange={this.handleChange}
              />
            </FormGroup>
          </form>
          <Button onClick={this.handleClick}>Zaloguj</Button>
        </div>
        );
      }
}

export default Login;