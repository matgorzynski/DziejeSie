import React, { Component } from 'react';
import './App.css';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import banner from './dzieje-sie-banner.png';
import Home from './Home';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="mainContainer">
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#home">Dzieje się</a>
                </Navbar.Brand>
              </Navbar.Header>
            <Nav>
              <NavDropdown eventKey={1} title="Kategorie" id="basic-nav-dropdown">
                <MenuItem eventKey={1.1}>Muzyka</MenuItem>
                <MenuItem eventKey={1.2}>Sztuka</MenuItem>
                <MenuItem eventKey={1.3}>Komedia</MenuItem>
                <MenuItem eventKey={1.4}>Gry</MenuItem>
                <MenuItem eventKey={1.5}>Film</MenuItem>
                <MenuItem eventKey={1.6}>Sport</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={2} title="Miasta" id="basic-nav-dropdown">
                <MenuItem eventKey={2.1}>Warszawa</MenuItem>
                <MenuItem eventKey={2.2}>Poznań</MenuItem>
                <MenuItem eventKey={2.3}>Gdańsk</MenuItem>
                <MenuItem eventKey={2.4}>Suwałki</MenuItem>
                <MenuItem eventKey={2.5}>Kraków</MenuItem>
                <MenuItem eventKey={2.6}>Katowice</MenuItem>
                <MenuItem eventKey={2.7}>Radom</MenuItem>
              </NavDropdown>
              <NavItem eventKey={3} href="#">
                Dodaj wydarzenie
              </NavItem>
            </Nav>
          </Navbar>
          <img src={banner} alt={"Banner"} />
            <div className="container">
              <Route exact path="/" Component={Home} />
              <Route path="/login" Component={Login} />
            </div>
        </div>
      </Router>
    );
  }
}

export default App;