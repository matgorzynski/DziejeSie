import React, { Component } from 'react';
import { FormGroup, Form, Col, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import axios from 'axios';

class AddEvent extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  
    this.state = {
      Name: '',
      Address: '',
      Postcode: '',
      Town: '',
      EventDate: '',
    }
  }

  validateField(fieldName, value) {
    switch(fieldName)
    {
      case 'Name':
        if (value.length > 10)
          return 'success';
        else if (value.length > 0) 
          return 'error';
        else 
          return null;
      case 'Address':
        return null;
      case 'Postcode':
        if (value.length === 0)
          return null;
        else if (value.match(/^[0-9]{2}-[0-9]{3}$/i))
          return 'success';
        else
          return 'error';
      case 'Town':
        if (value.length === 0)
          return null;
        else if (value.match(/^[A-Z][a-z]+$/i))
          return 'success';
        else
          return 'error';
      case 'Date':
        var dateNow = new Date();
        if (value > dateNow)
          return 'success';
        else
          return 'error';
      default:
        return null;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {      
      Name: this.state.Name, 
      Address: this.state.Address, 
      Postcode: this.state.Postcode, 
      Town: this.state.Town, 
      EventDate: this.state.EventDate,
      UserID: '1'
    }

    console.log(data);

    axios.post('http://matgorzynski.hostingasp.pl/event/add', data)
    .then(response => {
      if (response.status === 200) {
        console.log("Event has been sent");
      }
    }
    );
  }

  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  render() {
    return (
      <Form horizontal>
        <FormGroup 
          controlId="Name"
          validationState={this.validateField("Name", this.state.Name)}
          >
          <Col componentClass={ControlLabel} sm={2}>
            Nazwa wydarzenia
          </Col>
          <Col sm={4}>
            <FormControl 
              name="Name" 
              type="text" 
              placeholder="Wpisz tutaj nazwę wydarzenia" 
              value={this.state.Name} 
              onChange={this.handleChange.bind(this)} />
              <FormControl.Feedback />
              <HelpBlock>Nazwa wydarzenia musi mieć conajmniej 10 znaków.</HelpBlock>
          </Col>
        </FormGroup><FormGroup 
          controlId="Description"
//          validationState={this.validateField("Description", this.state.Description)}
          >
          <Col componentClass={ControlLabel} sm={2}>
            Opis wydarzenia
          </Col>
          <Col sm={4}>
            <FormControl 
              name="Description"
              componentClass="textarea"
//              value={this.state.Description} 
//              onChange={this.handleChange.bind(this)}
            />
              <FormControl.Feedback />
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="Address"
          validationState={this.validateField("Address", this.state.Address)}
          >
          <Col componentClass={ControlLabel} sm={2}>
            Adres wydarzenia
          </Col>
          <Col sm={4}>
            <FormControl name="Address" 
              type="text" 
              placeholder="Wpisz tutaj adres wydarzenia" 
              value={this.state.Address} 
              onChange={this.handleChange.bind(this)} />
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="Postcode"
          validationState={this.validateField("Postcode", this.state.Postcode)}
          >
          <Col componentClass={ControlLabel} sm={2}>
            Kod pocztowy
          </Col>
          <Col sm={4}>
            <FormControl 
              name="Postcode" 
              type="text" 
              pattern="[0-9]{2}-[0-9]{3}" 
              placeholder="XX-XXX" 
              value={this.state.Postcode} 
              onChange={this.handleChange.bind(this)} />
            <FormControl.Feedback />
            <HelpBlock>Wpisz kod pocztowy w formacie XX-XXX</HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="Town"
          validationState={this.validateField("Town", this.state.Town)}
          >
          <Col componentClass={ControlLabel} sm={2}>
            Nazwa miejscowości
          </Col>
          <Col sm={4}>
            <FormControl 
              name="Town" 
              type="text" 
              placeholder="Wpisz nazwę miejscowości" 
              value={this.state.Town} 
              onChange={this.handleChange.bind(this)} />
            <FormControl.Feedback />
            <HelpBlock>Nazwa miejscowości musi zaczynać się wielką literą</HelpBlock>
          </Col>
        </FormGroup>
        <FormGroup 
          controlId="EventDate"
          validationState={this.validateField("EventDate", this.state.EventDate)}
          >
          <Col componentClass={ControlLabel} sm={2}>
            Data wydarzenia
          </Col>
          <Col sm={4}>
            <FormControl 
              name="EventDate" 
              type="date" 
              value={this.state.EventDate} 
              onChange={this.handleChange.bind(this)} />
          </Col>
        </FormGroup>
        <Col sm={3}>
        </Col>
        <Col sm={4}>
          <Button onClick={this.handleSubmit}>
            Utwórz wydarzenie
          </Button>
        </Col>
      </Form>
    );
  }
}

export default AddEvent;