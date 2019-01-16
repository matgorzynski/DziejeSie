import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import checkmark from '../../checkmark.svg'
import { Redirect } from 'react-router';

class Result extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            message: 'Default message',
            redirect: false
        }
    }    
    
    componentDidMount() {
        setTimeout(function(){ 
            this.setState({redirect: true})
        }.bind(this), 4000);
    }

    redirectToHome() {
        if (this.state.redirect)
        return (
            <Redirect to='/'/>
        )
    }

    render() {
      return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={3} md={3}>
                    </Col>
                    <Col sm={6} md={6}>
                        <Image src={checkmark} />
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={3} md={3}>
                    </Col>
                    <Col sm={6} md={6}>
                        <h1 align="center">{this.props.location.state.message}</h1>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col sm={3} md={3}>
                    </Col>
                    <Col sm={6} md={6}>
                        <p align="center">Za chwilę zostaniesz przeniesiony na stronę główną</p>
                    </Col>
                </Row>
                {this.redirectToHome()}
            </Grid>
      );
    }
}

export default Result;