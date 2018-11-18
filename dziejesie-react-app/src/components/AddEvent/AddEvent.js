import React, { Component } from 'react';

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

  handleSubmit(event) {
    event.preventDefault();
    const data = {Name: this.state.Name, Address: this.state.Address, Postcode: this.state.Postcode, Town: this.state.Town, EventDate: this.state.EventDate};
    
    //console.log(JSON.stringify(data));

    fetch('http://matgorzynski.hostingasp.pl/event/add', {
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
        <label htmlFor="Name">Wpisz nazwę wydarzenia</label>
        <br />
        <input id="Name" name="Name" type="text" value={this.state.Name} onChange={this.handleChange.bind(this)} />

        <br />

        <label htmlFor="Address">Wpisz adres wydarzenia</label>
        <br />
        <input id="Address" name="Address" type="text" value={this.state.Address} onChange={this.handleChange.bind(this)} />

        <br />

        <label htmlFor="Postcode">Wpisz kod pocztowy wydarzenia</label>
        <br />
        <input id="Postcode" name="Postcode" type="postcode" value={this.state.Postcode} onChange={this.handleChange.bind(this)} />

        <br />
        
        <label htmlFor="Town">Wpisz nazwę miejscowości</label>
        <br />
        <input id="Town" name="Town" type="text" value={this.state.Town} onChange={this.handleChange.bind(this)} />

        <br />
        
        <label htmlFor="EventDate">Wpisz datę wydarzenia</label>
        <br />
        <input id="EventDate" name="EventDate" type="date" value={this.state.EventDate} onChange={this.handleChange.bind(this)} />

        <br />
        <button>Send data!</button>
      </form>
    );
  }
}

export default AddEvent;