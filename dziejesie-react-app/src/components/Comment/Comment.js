import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class Comment extends Component {

    render () {
        return (
            <Panel>
                <Panel.Heading>{this.props.user} {this.props.date}</Panel.Heading>
                <Panel.Body>{this.props.body}</Panel.Body>
            </Panel>
        )
    }
}

export default Comment;