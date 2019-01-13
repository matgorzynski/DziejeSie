import React, { Component } from 'react';
import './App.css';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Event from "./components/EventComponent/Event";
import AddEvent from "./components/AddEvent/AddEvent";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Result from "./components/Result/Result";

localStorage.setItem('userName', '');

class App extends Component {

  renderLoginNav() {
    if (localStorage.getItem('userName') === '') {
      return (
        <Nav pullRight>
          <NavItem href="/login/">Zaloguj</NavItem>
          <NavItem href="/register/">Rejestracja</NavItem>
        </Nav>
      )
    } else {
      return (
        <Nav>
          <NavItem>{}</NavItem>
          <NavItem onClick={() => this.logout()}>Wyloguj</NavItem>
        </Nav>
      )
    }
  }

  logout() {
    fetch('http://matgorzynski.hostingasp.pl/user/logout', {
      credentials: 'include',
      method: 'POST',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'VerySecureHeader': localStorage.getItem('userName')
      }
    })
    .then(res => { 
      if (res.status === 200) {
        localStorage.setItem('userName', '');
      }
      console.log("Response: ", res.json());
    })
  };

  render() {
    return (
        <Router>
          <div className="mainContainer">
              <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/">Dzieje się</a>
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
                <NavItem eventKey={3} href="/create/">
                  Dodaj wydarzenie
                </NavItem>
              </Nav>
              {this.renderLoginNav()}
            </Navbar>
            <div>
              <Route path="/" exact component={Event} />
              <Route path="/create/" component={AddEvent} />
              <Route path="/login/" component={Login} callbackFromParent={this.loginCallback} />
              <Route path="/register/" component={Register} />
              <Route path="/result/" component={Result}></Route>
            </div>
          </div>
        </Router>
    );
  }
}
export default App;