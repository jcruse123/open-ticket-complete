import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


class TicketNavbar extends React.Component {

  // New ticket link handler, takes user to new ticket page
  onNewClick = e => {
    e.preventDefault();
    this.props.history.push('/new');
  }

  // Brand name handler, takes user to index page
  onBrandClick = e => {
    e.preventDefault()
    this.props.history.push('/');
  }

  render() {
    // Displays navbar fixed at top of screen
    return(
      <Navbar fixed="top" variant="dark" bg="dark" expand="sm">
        <Navbar.Brand onClick={this.onBrandClick} href="/">Open Ticket</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={this.onNewClick} href="/new">New Ticket</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="#"></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default TicketNavbar;
