import React, { Component } from 'react';
import { Col, Row, Image, Label, PageHeader, Panel, Button, ButtonGroup, FormControl, HelpBlock } from 'react-bootstrap';
import axios from 'axios';
import './SingleEvent.css';
import placeholder from '../../photo_placeholder.png';
import Comment from '../Comment/Comment';

class SingleEvent extends Component {
    constructor(props) {
        super(props);
        
        this.addComment = this.addComment.bind(this);

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
                if (res.status === 200) {
                    this.refreshSuccess();
                }
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
                if (res.status === 200) {
                    this.refreshSuccess();
                }
            })
        )
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

    refreshSuccess() {
        window.location.reload();
    }

    addComment() {
        if (!this.state.comment.match(/^\s+$/i) && this.state.comment.length > 2) {
            fetch('http://matgorzynski.hostingasp.pl/comments/add', {
                credentials: 'include',
                method: 'POST',  
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'VerySecureHeader': localStorage.getItem('userName')
                },
                body: JSON.stringify({
                    body: this.state.comment,
                    userId: localStorage.getItem('userId'),
                    eventID: this.props.match.params.id
                }),
            }).then(response => 
                response.json().then(data => ({
                    data: data,
                    status: response.status
            })
            ).then(res => {
                console.log(res.status, res.data);
                this.refreshSuccess();
            }))
        } else {
            console.log("Bad comment");
        }
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
                    <HelpBlock>Minimum 3 znaki</HelpBlock>
                    <Button onClick={this.addComment}>
                        Dodaj
                    </Button>
                </div>
            )
        } else {
            return (
                <div>Zaloguj się aby dodać komentarz!</div>
            )
        }
    }

    renderComments () {
        if (this.state.comments !== undefined) {
            return(
                <div>
                    { this.state.comments.map(item =>
                        <div key={item.commentId}>
                            <Comment user={item.userId} body={item.body} date={item.addDate}/>
                        </div>
                    )}
                </div>
            )
        }
    }

    renderUpvotes () {
        if (localStorage.getItem('userName') !== '') {
            return ( 
                <div>
                    <ButtonGroup className="buttonMargin">
                            <Button bsStyle="success" onClick={this.upvote.bind(this)}> ▲ </Button>
                            <Button bsStyle="danger" onClick={this.downvote.bind(this)}> ▼ </Button>
                    </ButtonGroup>
                <Label>{this.state.eventPoints}</Label>
                </div>
            )
        } else {
            return (
                <div>Zaloguj się aby oceniać wydarzenia!</div>
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
                        {this.renderUpvotes()}
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
                        <Panel id="collapsible-panel-example-1" defaultExpanded={false} expanded={this.state.open}>
                            <Panel.Collapse>
                                <Panel.Body>
                                    {this.renderComments()}
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
