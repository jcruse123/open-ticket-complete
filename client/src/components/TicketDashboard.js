import React from 'react';
import axios from 'axios';
import TicketTable from './TicketTable';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import TicketNavbar from './TicketNavbar';

class TicketDashboard extends React.Component {
  // The ticket dashboard holds the state for child components.
  state = {
    tickets: [],
  }

  // When dashboard loads, request tickets from backend server,
  // then load them into the state.
  componentDidMount() {
    axios.get('/api/tickets/')
    .then(response => {
      console.log(response.data);
      this.setState({tickets: response.data})

    })
    .catch(error => {
      console.log(error);
    })
  }

  // Handler for new ticket button. Opens New Ticket route.
  onNewClick = e => {
    this.props.history.push('/new')
  };

  render() {
    // Passes the tickets as a prop to the TicketTable component,
    // then displays the table.
    return(
      <div>
        <div>
          <TicketNavbar {...this.props} />
          <br />
        </div>
        <div className="container">
          <Jumbotron>
            <h1 className="display-4">Open Ticket</h1>
            <hr />
            <p>
              Open Ticket is an easy to use issue tracker powered by React.
            </p>
            <p>
              <Button onClick={this.onNewClick}>New Ticket</Button>
            </p>
          </Jumbotron>
          <Card>
            <TicketTable className="shadow p-3 mb-5 bg-white rounded" {...this.props} tickets={this.state.tickets} />
          </Card>
        </div>
      </div>
    )
  }
}

export default TicketDashboard;
