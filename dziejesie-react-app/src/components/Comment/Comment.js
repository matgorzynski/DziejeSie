import React, { Component } from 'react';
import { Panel, Label, Button } from 'react-bootstrap';


class Comment extends Component {
    constructor(props) {
        super(props);

        this.deleteComment = this.deleteComment.bind(this);

    }
    convertDate () {
        return new Date(this.props.date).toLocaleDateString();
    }

    convertHours() {
        return new Date(this.props.date).toLocaleTimeString();
    }

    refreshSuccess() {
        window.location.reload();
    }

    deleteComment() {
        fetch('http://matgorzynski.hostingasp.pl/comments/delete/' + this.props.id, {
                credentials: 'include',
                method: 'DELETE',  
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'VerySecureHeader': localStorage.getItem('userName')     
                },
                body: JSON.stringify({
                    id: this.props.id
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

    checkUser() {
        console.log(localStorage.getItem('userId'))
        console.log(this.props.user)
        // eslint-disable-next-line eqeqeq
        if (localStorage.getItem('userId') == this.props.user) {
            return (
                <Button bsStyle="danger" bsSize="xsmall" onClick={this.deleteComment}>X</Button>
            )
        }
    }

    render () {
        return (
            <Panel>
                <Panel.Heading>
                        <span>
                            <Label bsStyle="primary">{this.props.user}</Label>
                            {/* <Button bsStyle="info">Info</Button> */}
                            {this.checkUser()}
                        </span>
                        <span>
                            {this.convertHours()}&nbsp;
                            {this.convertDate()}
                        </span>
                </Panel.Heading>
                <Panel.Body>{this.props.body}</Panel.Body>
            </Panel>
        )
    }
}

export default Comment;