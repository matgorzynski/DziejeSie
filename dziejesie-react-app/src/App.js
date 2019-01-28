import React, { Component } from 'react';
import './App.css';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Event from "./components/EventComponent/Event";
import AddEvent from "./components/AddEvent/AddEvent";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Result from "./components/Result/Result";
import SingleEvent from './components/SingleEvent/SingleEvent';
import ModifyEvent from './components/ModifyEvent/ModifyEvent';

class App extends Component {  
  constructor() {
  super();

  this.state = {
    redirect: false
  }
}
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
        <Nav pullRight>
          <NavItem>{localStorage.getItem('userName')}</NavItem>
          <NavItem onClick={() => this.logout()}>Wyloguj</NavItem>
        </Nav>
      )
    }
  }

  setRedirect() {
    this.setState({
      redirect: true
    })
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
        localStorage.setItem('userId', -1);
        this.setRedirect();
      }
      console.log("Response: ", res.json());
    })
  };

  logoutRedirect() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
        <Router>
          <div className="mainContainer">
              <Navbar>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="/">Dzieje się</a>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
              <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={3} href="/create/">
                  Dodaj wydarzenie
                </NavItem>
              </Nav>
              {this.renderLoginNav()}
              </Navbar.Collapse>
              </Navbar>
            <div>
              <Switch>
                <Route path="/" exact component={Event} />
                <Route path="/create/" component={AddEvent} />
                <Route path="/login/" component={Login} />
                <Route path="/register/" component={Register} />
                <Route path="/result/" component={Result}></Route>
                <Route path="/event/:id" component={SingleEvent}></Route>
                <Route path="/edit/" component={ModifyEvent}></Route>
                <Route component={Event} />
              </Switch>
              {this.logoutRedirect()}
            </div>
          </div>
        </Router>
    );
  }
}
export default App;