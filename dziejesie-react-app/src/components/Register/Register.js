import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormGroup, Form, Col, FormControl, ControlLabel, Button, HelpBlock, Alert, Row } from 'react-bootstrap';
import './Register.css'

var vals;

class Register extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      Login: '',
      Password: '',
      ConfirmPassword: '',
      Email: '',
      FirstName: '',
      LastName: '',
      Address: '',
      Postcode: '',
      Town: '',
      redirect: false,
      show: false,
      alertMessage: '',
      valStates: []
    }
  }

  validateField(fieldName, value, index) {
    var returnValue;

    switch(fieldName)
    {
      case 'Login':
        if (value.length > 1 && value.match(/^\w+$/))
          returnValue = 'success';
        else if (value.length > 0) 
          returnValue = 'error';
        else 
          returnValue = null;
        break;
      case 'Password':
        if (value.length > 2 && this.comparePasswords() && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{4,}$/))
          returnValue = 'success';
        else if (value.length > 0) 
          returnValue = 'error';
        else 
          returnValue = null;
        break;
      case 'ConfirmPassword':
        if (value.length > 2 && this.comparePasswords() && value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$^+=!*()@%&]).{4,}$/))
          returnValue = 'success';
        else if (value.length > 0) 
          returnValue = 'error';
        else 
          returnValue = null;
        break;
      case 'Postcode':
        if (value.length === 0)
          returnValue = null;
        else if (value.match(/^[0-9]{2}-[0-9]{3}$/))
          returnValue = 'success';
        else
          returnValue = 'error';
        break;
      case 'Town':
        if (value.length === 0)
          returnValue = null;
        else if (value.match(/^[A-ZĄŚĆÓŁŃĘŹŻ][a-zążśźćęńół]{2,}$/))
          returnValue = 'success';
        else
          returnValue = 'error';
        break;
      case 'Address':
        if (value.length === 0)
          returnValue = null;
        else if (value.match(/^\S[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ1234567890\- ]+$/))
          returnValue = 'success';
        else
          returnValue = 'error';
        break;
      case 'FirstName':
        if (value.length === 0)
          returnValue = null;
        else if (value.match(/^[A-ZĄŚĆÓŁŃĘŹŻ][a-zążśźćęńół]{2,}$/))
          returnValue = 'success';
        else
          returnValue = 'error';
        break;
      case 'LastName':
        if (value.length === 0)
          returnValue = null;
        else if (value.match(/^[A-ZĄŚĆÓŁŃĘŹŻ][a-zążśźćęńół]{2,}$/))
          returnValue = 'success';
        else
          returnValue = 'error';
        break;
      case 'Email':
        // eslint-disable-next-line no-useless-escape
        if (value.match(/^[A-Za-z0-9\.]+@[a-zA-z0.9_]+(\.[a-zA-Z0-9)]+)$/))
          returnValue = 'success';
        else if (value.length === 0)
          returnValue = 'null';
        else 
          returnValue = 'error';
        break;
      default:
        returnValue = null; 
        break;
    }
    this.setValidationState(index, returnValue);
    if (returnValue === 'null')
      return null
    else
      return returnValue;
  }

  setValidationState (index, value) {
    vals = this.state.valStates; 
    if (index != null && value != null)
    {
      if (value === 'error')
      {
        vals[index] = false;
      }
      else 
      {
        vals[index] = true;
      }
    }
  }

  checkValidationStates () {
    for (var i = 0; i < vals.length; i++) {
      if (vals[i] === false) {
        return false;
      }
    }
    return true;
  }

  comparePasswords() {
    if (this.state.Password === this.state.ConfirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    
    if (this.checkValidationStates())
    {
      const data = {
        Login: this.state.Login,
        Password: this.state.Password,
        ConfirmPassword: this.state.ConfirmPassword,
        email: this.state.Email,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        Address: this.state.Address,
        PostCode: this.state.Postcode,
        Town: this.state.Town
      };

      console.log(JSON.stringify(data));

        
      fetch('http://matgorzynski.hostingasp.pl/user/register', {
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
            status: data.statusCode
      })
      ).then(res => {
          console.log(res.status, res.data);
          if (res.data.iduser !== undefined) {
            this.setRedirect();
          } else {
            if (res.data.opis !== undefined){
              this.setState({
                show: true,
                alertMessage: res.data.opis
              })
            } else {
              this.setState({
                show: true,
                alertMessage: 'Sprawdź czy pola zostały poprawnie wypełnione'
              })
            }
            this.showAlert();
          }
        })
      )
    }
  }

  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
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

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/result/',
        state: { message: "Udało się zarejestrować!" }
      }} />
    }
  }
  render() {
    return (
      <Form horizontal>
        {this.renderRedirect()}
        <Row>
          {this.showAlert()}
        </Row>
        <FormGroup 
          controlId="Login"
          validationState={this.validateField("Login", this.state.Login, 0)}
          >
          <Col componentClass={ControlLabel} sm={4} md={4}>
            Login
          </Col>
          <Col sm={4} md={4}>
            <FormControl 
              name="Login" 
              type="text" 
              value={this.state.Login} 
              onChange={this.handleChange.bind(this)} />
              <FormControl.Feedback />
              <HelpBlock>Login musi mieć conajmniej 2 znaki</HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="Password"
          validationState={this.validateField("Password", this.state.Password, 1)}
          >
          <Col componentClass={ControlLabel} sm={4} md={4}>
            Hasło
          </Col>
          <Col sm={4} md={4}>
            <FormControl 
              name="Password" 
              type="password" 
              value={this.state.Password} 
              onChange={this.handleChange.bind(this)} />
              <FormControl.Feedback />
              <HelpBlock>Hasło musi zawierac przynajmniej jedną dużą literę, jedną małą literę, jeden znak specjalny, jedną cyfrę, brak znaków polskich </HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="ConfirmPassword"
          validationState={this.validateField("ConfirmPassword", this.state.ConfirmPassword, 2)}
          >
          <Col componentClass={ControlLabel} sm={4} md={4}>
            Powtórz hasło
          </Col>
          <Col sm={4} md={4}>
            <FormControl 
              name="ConfirmPassword" 
              type="password" 
              value={this.state.ConfirmPassword} 
              onChange={this.handleChange.bind(this)} />
              <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="Email"
          validationState={this.validateField("Email", this.state.Email, 3)}
          >
          <Col componentClass={ControlLabel} sm={4} md={4}>
            Adres email
          </Col>
          <Col sm={4} md={4}>
            <FormControl 
              name="Email" 
              type="email" 
              value={this.state.Email} 
              onChange={this.handleChange.bind(this)} />
              <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="FirstName"
          validationState={this.validateField("FirstName", this.state.FirstName, 4)}
          >
          <Col componentClass={ControlLabel} sm={4} md={4}>
            Imię
          </Col>
          <Col sm={4} md={4}>
            <FormControl 
              name="FirstName" 
              type="text" 
              value={this.state.FirstName} 
              onChange={this.handleChange.bind(this)} />
              <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="LastName"
          validationState={this.validateField("LastName", this.state.LastName, 5)}
          >
          <Col componentClass={ControlLabel} sm={4} md={4}>
            Nazwisko
          </Col>
          <Col sm={4} md={4}>
            <FormControl 
              name="LastName" 
              type="text" 
              value={this.state.LastName} 
              onChange={this.handleChange.bind(this)} />
              <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="Town"
          validationState={this.validateField("Town", this.state.Town, 6)}
          >
          <Col componentClass={ControlLabel} sm={4} md={4}>
            Nazwa miejscowości
          </Col>
          <Col sm={4} md={4}>
            <FormControl 
              name="Town" 
              type="text"
              value={this.state.Town} 
              onChange={this.handleChange.bind(this)} />
            <FormControl.Feedback />
            <HelpBlock>Nazwa miejscowości musi zaczynać się wielką literą</HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="Address"
          validationState={this.validateField("Address", this.state.Address, 7)}
          >
          <Col componentClass={ControlLabel} sm={4} md={4}>
            Adres
          </Col>
          <Col sm={4} md={4}>
            <FormControl name="Address" 
              type="text" 
              value={this.state.Address} 
              onChange={this.handleChange.bind(this)} />
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="Postcode"
          validationState={this.validateField("Postcode", this.state.Postcode, 8)}
          >
          <Col componentClass={ControlLabel} sm={4} md={4}>
            Kod pocztowy
          </Col>
          <Col sm={4} md={4}>
            <FormControl 
              name="Postcode" 
              type="text" 
              pattern="[0-9]{2}-[0-9]{3}" 
              value={this.state.Postcode} 
              onChange={this.handleChange.bind(this)} />
            <FormControl.Feedback />
            <HelpBlock>Wpisz kod pocztowy w formacie XX-XXX</HelpBlock>
          </Col>
        </FormGroup>
        <Col sm={4} md={4} />
        <Col sm={4} md={4}>
          <Button bsSize="large" onClick={this.handleSubmit}>
            Zarejestruj
          </Button>
        </Col>
      </Form>
    );
  }
}

export default Register;