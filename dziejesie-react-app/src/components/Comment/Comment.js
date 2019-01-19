import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class Comment extends Component { 
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Panel>
                <Panel.Heading>{this.props.user}</Panel.Heading>
                <Panel.Body>{this.props.body}</Panel.Body>
            </Panel>
        )
    }
}

export default Comment;