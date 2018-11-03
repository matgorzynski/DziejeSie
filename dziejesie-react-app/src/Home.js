import React, { Component } from 'react';
import Event from "./components/EventComponent/Event";

class Home extends Component {
  render() {
    return (
        <div className="homeContent">
            <Event />
        </div>
    );
  }
}

export default Home;