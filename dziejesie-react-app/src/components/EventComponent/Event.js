import React, { Component } from 'react';

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
                        <tr>
                            <td>    Lp. {item.eventId}  |</td>
                            <td>    Nazwa: {item.name}  |</td>
                            <td>    Adres: {item.address}   |</td>
                            <td>    Kod pocztowy: {item.postcode}   |</td>
                            <td>    Miasto: {item.town} |</td>
                            <td>    Data: {item.eventDate}  |</td>
                            <td>    Dodano: {item.addDate}  |</td>
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
                <table>
                    {this.state.data}
                </table>
            </div>
        )
    }
}

export default Event;