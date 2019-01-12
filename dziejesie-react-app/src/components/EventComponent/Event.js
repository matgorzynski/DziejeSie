import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        };
    }

    componentDidMount() {
        axios.get('http://matgorzynski.hostingasp.pl/event/all')
        .then(response => {
            const events = response.data;
            this.setState({ events : events });
            console.log("state", this.state.events);
        });
    }

    render() {
        return(
            <div>
                <Table responsive striped bordered condensed>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nazwa</th>
                            <th>Miejsce</th>
                            <th>Kod pocztowy</th>
                            <th>Miasto</th>
                            <th>Data wydarzenia</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.events.map(item =>
                        <tr key={item.eventId}>
                            <td>{item.eventId}</td>
                            <td><a href={`/event/${item.eventId}`}>{item.name}</a></td>
                            <td>{item.address}</td>
                            <td>{item.postcode}</td>
                            <td>{item.town}</td>
                            <td>{item.eventDate}</td>
                            <td align="center"><Button bsSize="xsmall" bsStyle="danger">X</Button></td>
                        </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Event;