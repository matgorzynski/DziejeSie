import React, { Component } from 'react';
import { Grid, Row, Col, Clearfix } from 'react-bootstrap';

class Result extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            message: 'Default message'
        }
    }    
    
    render() {
      return (
            <Grid>
                <Row className="show-grid">
                <Col sm={6} md={3}>
                    ASD
                    <br />
                </Col>
                <Col sm={6} md={3}>
                    <p align="center" > ASD </p>
                    <br />
                </Col>
                <Clearfix visibleSmBlock>
                </Clearfix>
                <Col sm={6} md={3}>
                    ASD
                    <br />
                </Col>
                </Row>
            </Grid>
      );
    }
}

export default Result;