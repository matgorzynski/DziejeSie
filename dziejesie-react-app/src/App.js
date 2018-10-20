import React, { Component } from 'react';
import './App.css';

import Event from "./components/EventComponent/Event";

class App extends Component {
  render() {
    return (
      <div>
        <Event />
      </div>
    );
  }
}

export default App;