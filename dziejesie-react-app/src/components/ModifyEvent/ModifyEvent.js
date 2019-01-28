import React, { Component } from 'react';
import { FormGroup, Form, Col, FormControl, ControlLabel, Button, HelpBlock, Alert, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { isNullOrUndefined } from 'util';
import axios from 'axios';

var vals;

class ModifyEvent extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadEventContent = this.loadEventContent.bind(this);

    this.state = {
      redirect: false,
      eventId: this.props.location.state.eventId,
      eventData: [],
      Name: '',
      Address: '',
      Postcode: '',
      Town: '',
      EventDate: '',
      Description: '',
      Category: '',
      valStates: [],
      show: false,
      alertMessage: '',
      userLogged: true
    }
  }

  componentDidMount() {
    if (localStorage.getItem('userName') === '') 
      this.setState({
        show: true,
        alertMessage: 'Zaloguj się aby zmodyfikować wydarzenie!',
        userLogged: false
    })
    this.loadEventContent();
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
        state: { message: "Udało się zmodyfikować event!" }
      }} />
    }
  }

  validateField(fieldName, value, index) {
    var returnValue;

    switch(fieldName)
    {
      case 'Name':
        if (value.length > 10 && !value.match(/^\s+$/i))
          returnValue = 'success';
        else if (value.length > 0) 
          returnValue = 'error';
        else 
          returnValue = null;
        break;
      case 'Address':
        if (value.match(/^\S[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ1234567890\- ]+$/))
          returnValue = 'success';
        else if (value.length === 0)
          returnValue = null;
        else
          returnValue = 'error'
        break;
      case 'Postcode':
        if (value.length === 0)
          returnValue = null;
        else if (value.match(/^[0-9]{2}-[0-9]{3}$/i))
          returnValue = 'success';
        else
          returnValue = 'error';
        break;
      case 'Town':
        if (value.length === 0)
          returnValue = null;
        else if (value.match(/^\S[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$/i))
          returnValue = 'success';
        else
          returnValue = 'error';
        break;
      case 'EventDate':
        var dateNow = new Date();
        if (new Date(value) > dateNow)
          returnValue = 'success';
        else if (new Date(value) < dateNow)
          returnValue = 'error';
        else if (isNaN(value) || isNullOrUndefined(value) || value === '')
          returnValue = null;
        break;
      case 'Description':
        if (value.match(/^\S.+$/) && value.length > 10)
          returnValue = 'success';
        else if (value.length === 0)
          returnValue = null;
        else
          returnValue = 'error';
        break;
      case 'Category':
        if (value === '' || value === null)
          returnValue = null;
        else
          returnValue = 'success';
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
      if (value === 'error' || value === null)
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
    if (this.state.Category === '') {
      return false;
    }

    return true;
  }

  loadEventContent() {
    return axios.get('http://matgorzynski.hostingasp.pl/event/' + this.state.eventId)
    .then(response => {
        const eventData = response.data;
        this.setState({ 
            eventData : eventData,
            Name: eventData.name,
            Address: eventData.address,
            Postcode: eventData.postcode,
            Town: eventData.town,
            EventDate: '',
            Description: eventData.description,
            Category: eventData.category,
        });
        console.log("eventData", this.state.eventData);
    })
  }

  handleSubmit(event) {
    if (this.checkValidationStates()) {
      event.preventDefault();
      const data = {      
        Name: this.state.Name, 
        Address: this.state.Address, 
        Postcode: this.state.Postcode, 
        Town: this.state.Town, 
        EventDate: this.state.EventDate,
        Description: this.state.Description,
        Category: this.state.Category,
        UserID: localStorage.getItem('userId')
      }

      console.log(data);
      
      fetch('http://matgorzynski.hostingasp.pl/event/modify/' + this.state.eventData.eventId, {
        credentials: 'include',
        method: 'PUT',  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'VerySecureHeader': localStorage.getItem('userName')     
        },
        body: JSON.stringify({
            id: this.state.eventData.eventId, 
            events: data
        }),
      })
      .then(res => {
        if (res.status === 200) {  
          this.setState({
            redirect: true
          })
        } else {
          this.setState({
            show: true,
            alertMessage: 'Zaloguj się aby zmodyfikować wydarzenie!'
          })
        }
        console.log('Response:', res.json());
      });
    } else {
      this.setState({
        show: true,
        alertMessage: 'Sprawdź czy pola zostały poprawnie wypełnione'
      })
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

  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  render() {
    if (!this.state.userLogged)
    {
      return (
        <div>
          {this.showAlert()}
        </div>
      )
    } else {
      if (this.state.redirect) {
        return (
          <Redirect to={{
            pathname: '/result/',
            state: { message: 'Pomyślnie edytowano event!' }
          }}/>
        )
      } else
      return (
          <div>
            <Row>
              {this.showAlert()}
            </Row>
            {this.renderRedirect()}
            <Form horizontal>
              <FormGroup 
                controlId="Name"
                validationState={this.validateField("Name", this.state.Name, 0)}
                >
                <Col componentClass={ControlLabel} sm={4} md={4}>
                  Nazwa wydarzenia
                </Col>
                <Col sm={4} md={4}>
                  <FormControl 
                    name="Name" 
                    type="text"
                    maxLength="50"
                    placeholder="Wpisz tutaj nazwę wydarzenia" 
                    value={this.state.Name} 
                    onChange={this.handleChange.bind(this)} />
                    <FormControl.Feedback />
                    <HelpBlock>Nazwa wydarzenia musi mieć conajmniej 10 znaków.</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup 
                controlId="Category"
                validationState={this.validateField("Category", this.state.Category, 6)}
                >
                <Col componentClass={ControlLabel} sm={4} md={4}>
                  Kategoria
                </Col>
                <Col sm={4} md={4}>
                  <FormControl 
                    name="Category" 
                    componentClass="select" 
                    placeholder="select"
                    value={this.state.Category} 
                    onChange={this.handleChange.bind(this)}>
                    <option value="" defaultValue hidden>Wybierz kategorię</option>
                    <option value="Muzyka">Muzyka</option>
                    <option value="Sztuka">Sztuka</option>
                    <option value="Komedia">Komedia</option>
                    <option value="Gry">Gry</option>
                    <option value="Film">Film</option>
                    <option value="Sport">Sport</option>
                  </FormControl>
                </Col>
              </FormGroup>
              <FormGroup 
                controlId="Description"
                validationState={this.validateField("Description", this.state.Description, 1)}
                >
                <Col componentClass={ControlLabel} sm={4} md={4}>
                  Opis wydarzenia
                </Col>
                <Col sm={4} md={4}>
                  <FormControl 
                    name="Description"
                    componentClass="textarea"
                    maxLength="1500"
                    value={this.state.Description} 
                    onChange={this.handleChange.bind(this)}
                  />
                    <FormControl.Feedback />
                </Col>
              </FormGroup>
              <FormGroup 
                controlId="Address"
                validationState={this.validateField("Address", this.state.Address, 2)}
                >
                <Col componentClass={ControlLabel} sm={4} md={4}>
                  Adres wydarzenia
                </Col>
                <Col sm={4} md={4}>
                  <FormControl name="Address" 
                    type="text"
                    maxLength="50"
                    placeholder="Wpisz tutaj adres wydarzenia" 
                    value={this.state.Address} 
                    onChange={this.handleChange.bind(this)} />
                </Col>
              </FormGroup>
              <FormGroup 
                controlId="Postcode"
                validationState={this.validateField("Postcode", this.state.Postcode, 3)}
                >
                <Col componentClass={ControlLabel} sm={4} md={4}>
                  Kod pocztowy
                </Col>
                <Col sm={4} md={4}>
                  <FormControl 
                    name="Postcode" 
                    type="text" 
                    pattern="[0-9]{2}-[0-9]{3}" 
                    placeholder="XX-XXX"
                    maxLength="6"
                    value={this.state.Postcode} 
                    onChange={this.handleChange.bind(this)} />
                  <FormControl.Feedback />
                  <HelpBlock>Wpisz kod pocztowy w formacie XX-XXX</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup 
                controlId="Town"
                validationState={this.validateField("Town", this.state.Town, 4)}
                >
                <Col componentClass={ControlLabel} sm={4} md={4}>
                  Nazwa miejscowości
                </Col>
                <Col sm={4} md={4}>
                  <FormControl 
                    name="Town" 
                    type="text"
                    maxLength="30"
                    placeholder="Wpisz nazwę miejscowości" 
                    value={this.state.Town} 
                    onChange={this.handleChange.bind(this)} />
                  <FormControl.Feedback />
                  <HelpBlock>Nazwa miejscowości musi zaczynać się wielką literą</HelpBlock>
                </Col>
              </FormGroup>
              <FormGroup 
                controlId="EventDate"
                validationState={this.validateField("EventDate", this.state.EventDate, 5)}
                >
                <Col componentClass={ControlLabel} sm={4} md={4}>
                  Data wydarzenia
                </Col>
                <Col sm={4} md={4}>
                  <FormControl 
                    name="EventDate" 
                    type="datetime-local" 
                    value={this.state.EventDate} 
                    onChange={this.handleChange.bind(this)} />
                </Col>
              </FormGroup>
              <Row>
                <Col sm={4} md={4} />
                <Col sm={4} md={4}>
                  <p align="right">Wszystkie pola muszą zostać wypełnione</p>
                </Col>
                <Col sm={4} md={4} />
              </Row>
              <Row>
                <Col sm={4} md={4} />
                <Col sm={4} md={4}>
                  <Button onClick={this.handleSubmit} bsSize="large">
                    Modyfikuj wydarzenie
                  </Button>
                </Col>
              </Row>
              <Row />
              <Row>
                {this.showAlert()}
              </Row>
            </Form>
          </div>
      );
    }
  }
}

export default ModifyEvent;