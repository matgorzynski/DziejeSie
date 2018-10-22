import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        fetch('http://matgorzynski.hostingasp.pl/event/all')
        .then(response =>  {
            return response.json();
        })
        .then(myJson => {
            let data = myJson.map((item) => {
                return (
                        <tr key={item.eventId}>
                            <td>{item.eventId}</td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>{item.postcode}</td>
                            <td>{item.town}</td>
                            <td>{item.eventDate}</td>
                            <td>{item.addDate}</td>
                        </tr>
                )
            })
            this.setState({ data : data });
            console.log("state", this.state.data);
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
                            <th>Kod pocztowy? xD</th>
                            <th>Miasto</th>
                            <th>Data wydarzenia</th>
                            <th>Dodano</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Event;