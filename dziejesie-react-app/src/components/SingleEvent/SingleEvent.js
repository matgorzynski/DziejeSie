import React, { Component } from 'react';
import { Col, Row, Image, Label, PageHeader, Panel, Button, ButtonGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import './SingleEvent.css';
import placeholder from '../../photo_placeholder.png';
import Comment from '../Comment/Comment';

class SingleEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventData: [],
            eventPoints: 0,
            comments: [],
            comment: '',
            eventId: this.props.match.params.id
        };
    }

    componentDidMount() {
        this.fetchEvent();
        this.fetchUpvotes();
        this.fetchComments();
    }

    fetchEvent() {
        return axios.get('http://matgorzynski.hostingasp.pl/event/' + this.props.match.params.id)
        .then(response => {
            const eventData = response.data;
            this.setState({ eventData : eventData });
            console.log("eventData", this.state.eventData);
        })
    }

    fetchComments() {
        axios.get('http://matgorzynski.hostingasp.pl/comments/get/event/' + this.props.match.params.id)
        .then(response => {
            const comments = response.data;
            this.setState({ comments : comments });
            console.log("comments", this.state.comments);
        });
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
                this.setState({
                    eventPoints: res.data
                })
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
                    userId: localStorage.getItem('userId'),
                    eventId: this.state.eventId
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
                    userId: localStorage.getItem('userId'),
                    eventId: this.state.eventId
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

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    addComment() {
        fetch('http://matgorzynski.hostingasp.pl/comments/add', {
            credentials: 'include',
            method: 'POST',  
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'VerySecureHeader': localStorage.getItem('userName')     
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userId'),
                eventId: this.state.eventId
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

    renderAddComment () {
        if (localStorage.getItem('userName') !== '') {
            return (
                <div>
                    Dodaj komentarz
                    <FormControl 
                        name="comment"
                        componentClass="textarea"
                        maxLength="1500"
                        value={this.state.comment} 
                        onChange={this.handleChange.bind(this)}
                    />
                    <Button>
                        Dodaj
                    </Button>
                </div>
            )
        }
    }

    renderComments () {
        if (this.state.comments !== undefined) {
            return(
                <div>
                    { this.state.comments.map(item =>
                        <div key={item.commentId}>
                            <Comment user={item.userId} body={item.body} />
                        </div>
                    )}
                </div>
            )
        }
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
                        <ButtonGroup>
                            <Button bsStyle="success" onClick={this.upvote.bind(this)}> ▲ </Button>
                            <h2><Label>{this.state.eventPoints}</Label></h2>
                            <Button bsStyle="danger" onClick={this.downvote.bind(this)}> ▼ </Button>
                        </ButtonGroup>
                    </Row>
                    {/* <Row className="buttonMargin">
                        <Button bsStyle="warning">★ Dodaj do ulubionych</Button>
                    </Row> */}
                    <Row className="buttonMargin">
                        <ButtonGroup>
                            <Button> Edytuj </Button>
                            <Button> Usuń </Button>
                        </ButtonGroup>
                    </Row>
                </Col>
                <Col sm={8} md={6}>
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
                        <Panel id="collapsible-panel-example-1" defaultExpanded={false} expanded={this.state.open}>
                            <Panel.Collapse>
                                <Panel.Body>
                                    {/* {this.renderComments()} */}
                                    {this.renderAddComment()}
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
