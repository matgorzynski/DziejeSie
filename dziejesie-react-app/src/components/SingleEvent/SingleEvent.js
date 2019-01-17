import React, { Component } from 'react';
import { Col, Row, Image, Label, PageHeader, Panel, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import './SingleEvent.css';
import placeholder from '../../photo_placeholder.png';

class SingleEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventData: [],
            eventPoints: 0,
            eventId: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.fetchEvent();
        this.fetchUpvotes();
    }

    fetchEvent() {
        return axios.get('http://matgorzynski.hostingasp.pl/event/' + this.props.match.params.id)
        .then(response => {
            const eventData = response.data;
            this.setState({ eventData : eventData });
            console.log("state", this.state.eventData);
        })
    }

    fetchUpvotes() {
        fetch('http://matgorzynski.hostingasp.pl/upvote/points', {
                credentials: 'include',
                method: 'POST',  
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'VerySecureHeader': localStorage.getItem('userName')     
                },
                body: JSON.stringify({
                    eventId: this.props.match.params.id
                }),
            }).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
            })
            ).then(res => {
                console.log(res.status, res.data);
            })
        )
    }

    upvote() {
        fetch('http://matgorzynski.hostingasp.pl/upvote/plus', {
                credentials: 'include',
                method: 'POST',  
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'VerySecureHeader': localStorage.getItem('userName')     
                },
                body: JSON.stringify({
                    UserId: localStorage.getItem('userId'),
                    EventId: this.state.eventId
                }),
            }).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
            })
            ).then(res => {
                console.log(res.status, res.data);
            })
        )
    }

    downvote() {
        fetch('http://matgorzynski.hostingasp.pl/upvote/minus', {
                credentials: 'include',
                method: 'POST',  
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'VerySecureHeader': localStorage.getItem('userName')     
                },
                body: JSON.stringify({
                    UserId: localStorage.getItem('userId'),
                    EventId: this.state.eventId
                }),
            }).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
            })
            ).then(res => {
                console.log(res.status, res.data);
            })
        )
    }

    render() {
        return(
            <div>
                <Col sm={1} md={2} />
                <Col sm={2} md={2}>
                    <Row>
                        <Image src={placeholder} responsive />
                    </Row>
                    <Row className="buttonMargin">
                        <ButtonGroup className="buttonMargin">
                            <Button bsStyle="success" onClick={this.upvote.bind(this)}> ▲ </Button>
                            <Button bsStyle="danger" onClick={this.downvote.bind(this)}> ▼ </Button>
                        </ButtonGroup>
                        <Label>{this.state.eventPoints}</Label>
                    </Row>
                    {/* <Row className="buttonMargin">
                        <Button bsStyle="warning">★ Dodaj do ulubionych</Button>
                    </Row> */}
                    <Row className="buttonMargin">
                        <ButtonGroup className="buttonMargin">
                            <Button bsSize="small"> Edytuj </Button>
                            <Button bsSize="small"> Usuń </Button>
                        </ButtonGroup>
                    </Row>
                </Col>
                <Col sm={1} md={1} />
                <Col sm={7} md={5}>
                    <Row>
                        <PageHeader>
                            {this.state.eventData.name}
                        </PageHeader>
                    </Row>
                    <Row className="smallMargin">
                        <Col sm={4} md={3}><h3>{this.state.eventData.category}</h3></Col>
                        <Col sm={4} md={3}><h3><Label>{this.state.eventData.user}</Label></h3></Col>
                    </Row>
                    <Row className="smallMargin">
                       <h4>
                            {this.state.eventData.town} • {this.state.eventData.eventDate} • {this.state.eventData.eventHour}
                        </h4>
                    </Row>
                    <Row className="smallMargin">
                        <h5>
                            Gdzie: {this.state.eventData.address}
                        </h5>
                    </Row>
                    <Row className="panMargin">
                        <Panel>
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Opis wydarzenia:</Panel.Title>
                            </Panel.Heading>
                                <Panel.Body>{this.state.eventData.description}</Panel.Body>
                        </Panel>
                    </Row>
                    <Row className="comMargin">
                        <Button onClick={() => this.setState({ open: !this.state.open })}>
                            Komentarze
                        </Button>
                        <br />
                        <Panel id="collapsible-panel-example-1" expanded={this.state.open}>
                            <Panel.Collapse>
                                <Panel.Body>
                                    Tutaj pojawią się komentarze :)
                                </Panel.Body>
                            </Panel.Collapse>
                         </Panel>
                    </Row>
                </Col>
                <Col sm={1} md={2} />
            </div>
        )
    }

}

export default SingleEvent;
