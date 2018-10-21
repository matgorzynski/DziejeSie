import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class AddEvent extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleChange = this.handleChange.bind(this);
    
        this.state = {
          name: '',
          address: '',
          postcode: '',
          town: '',
          date: ''
        };
      }
    
      getValidationState() {
        const length = this.state.name.length;
        if (length >= 12) return 'success';
        else if (length > 0) return 'error';
        return null;
      }
    
      handleChange(e) {
        this.setState({ value: e.target.value });
      }
    
      render() {
        return (
        <div>
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Dodaj wydarzenie</ControlLabel>
              <FormControl
                type="text"
                value={this.state.name}
                placeholder="Nazwa wydarzenia"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              <HelpBlock>Nazwa musi posiadać conajmniej 12 znaków</HelpBlock>
              <FormControl
                type="text"
                value={this.state.address}
                placeholder="Miejsce wydarzenia"
                onChange={this.handleChange}
              />
              <FormControl
                type="text"
                value={this.state.address}
                placeholder="Kod pocztowy"
                onChange={this.handleChange}
               />
               <FormControl
                type="text"
                value={this.state.address}
                placeholder="Miasto"
                onChange={this.handleChange}
               />
               <FormControl
                type="date"
                value={this.state.address}
                placeholder="Data wydarzenia"
                onChange={this.handleChange}
               />
            </FormGroup>
          </form>
        </div>
        );
      }
}

export default AddEvent;