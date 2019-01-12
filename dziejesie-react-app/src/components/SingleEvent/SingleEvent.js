import React, { Component } from 'react';
import { Col, Row, Image, Label } from 'react-bootstrap';
import axios from 'axios';
import placeholder from '/Repos/DziejeSie/dziejesie-react-app/src/photo_placeholder.png';

class SingleEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventData: [],
        };
    }

    componentDidMount() {
        axios.get('http://matgorzynski.hostingasp.pl/event/' + this.props.match.params.id)
        .then(response => {
            const eventData = response.data;
            this.setState({ eventData : eventData });
            console.log("state", this.state.eventData);
        });
    }

    render() {
        return(
            <div>
                <Col sm={4} md={3} />
                <Col sm={2} md={2}>
                    <Row>
                        <Image src={placeholder} responsive />
                    </Row>
                    <Row>
                        Upvote
                    </Row>
                    <Row>
                        Downwote
                    </Row>
                    <Row>
                        Fav
                    </Row>
                </Col>
                <Col sm={8} md={6}>
                    <Row>
                        <h1>
                            <Label bsStyle="primary">
                                {this.state.eventData.name}
                            </Label>
                        </h1>
                    </Row>
                    <Row>
                        <Col sm={2} md={2}>{this.state.eventData.category}</Col>
                        {this.state.eventData.user}
                    </Row>
                    <Row>
                        {this.state.eventData.town} / {this.state.eventData.eventDate} / {this.state.eventData.eventHour}
                    </Row>
                    <Row>
                        {this.state.eventData.address}
                    </Row>
                    <Row>
                        {this.state.eventData.description}
                    </Row>
                    <Row>
                        Komentarze
                    </Row>
                </Col>
                <Col sm={4} md={2} />
            </div>
        )
    }

}

export default SingleEvent;
