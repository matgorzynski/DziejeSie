import React, { Component } from 'react';
import { Col, PageHeader } from 'react-bootstrap';
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
                <Col sm={1} md={2} />
                <Col sm={10} md={8}>
                <h1>Nadchodzące wydarzenia:</h1>
                <tbody>
                        { this.state.events.map(item =>
                        <div key={item.eventId}>
                           <PageHeader>
                                    <a href={`/event/${item.eventId}`}>{item.name}</a>
                                    <small>  🡒  {item.town}</small>
                           </PageHeader>
                            <h4><b>Gdzie:</b> {item.address} {item.postcode}</h4>
                            <h4><b>Kiedy:</b> {item.eventDate}</h4>
                        </div>
                        )}
                </tbody>
            </Col>
            <Col sm={1} md={2} />
            </div>
        )
    }
}

export default Event;