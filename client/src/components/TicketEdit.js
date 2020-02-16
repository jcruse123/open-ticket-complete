import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TicketNavbar from './TicketNavbar';

class TicketEdit extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeRequestor = this.onChangeRequestor.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onChangeDue = this.onChangeDue.bind(this);

    this.state = {
      id: '',
      author: '',
      requestor: '',
      desc: '',
      due: '',
      journal: '',
      journals: []
    }
  }

  // Looks up the ticket being edited using id,
  // then loads that ticket into the state.
  componentDidMount() {
    axios.get('/api/tickets/' + this.props.match.params.id)
    .then(response => {
      this.setState({
        id: response.data._id,
        author: response.data.author.username,
        requestor: response.data.requestor,
        desc: response.data.desc,
        due: new Date(response.data.due),
        journals: response.data.journals
      })
    })
  }

  // Form input field handlers
  onChangeAuthor = e => {
    this.setState({
      author: e.target.value
    })
  }

  onChangeRequestor = e => {
    this.setState({
      requestor: e.target.value
    })
  }

  onChangeDesc = e => {
    this.setState({
      desc: e.target.value
    })
  }

  onChangeJournal = e => {
    this.setState({
      journal: e.target.value
    })
  }

  onChangeDue = e => {
    this.setState({
      due: e
    });
    console.log(this.state.due)
  };

  // Save changes to ticket button handler
  onSaveClick = e => {
    e.preventDefault()

    let editedTicket = {};

    // If there is a new journal entry present,
    // add that entry to the array of journals in state.
    if (this.state.journal.length > 0) {
      editedTicket = {
        desc: this.state.desc,
        requestor: this.state.requestor,
        author: {
          username: this.state.author
        },
        due: this.state.due,
        journals: this.state.journals.concat(this.state.journal)
      }
    }

    // If there is no new journal entry,
    // do not modify journals. This prevents empty journals
    // from being added to the database.
    else {
      editedTicket = {
        desc: this.state.desc,
        requestor: this.state.requestor,
        author: {
          username: this.state.author
        },
        due: this.state.due,
        journals: this.state.journals
      }
    }

    // Send the updated ticket to the server
    axios.put('/api/tickets/' + this.state.id, editedTicket)
    .then(res => {
      // After ticket is updated, refresh information on screen
      axios.get('/api/tickets/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          id: response.data._id,
          author: response.data.author.username,
          requestor: response.data.requestor,
          desc: response.data.desc,
          due: new Date(response.data.due),
          journals: response.data.journals,
          journal: ''
        })
      })
    });

  }

  // Delete ticket button handler
  onDeleteClick = e => {
    e.preventDefault()

    // Find ticket with id and delete it,
    // then redirect to index page.
    axios.delete('/api/tickets/' + this.state.id)
    .then(res => {
      console.log(res.data)
      this.props.history.push('/');
    });
  }

  render() {
    // Display edit form using Bootstrap form components
    return(
      <div>
        <div>
          <TicketNavbar {...this.props} />
          <br />
        </div>
        <Container>
          <Card>
            <Container className="bg-light">
              <br />
              <h2>Ticket ID: {this.state.id.substring(this.state.id.length - 6, this.state.id.length).toUpperCase()}</h2>
              <hr />
              <Form>
                <Form.Group controlId="formAuthorText">
                  <Form.Label>Author</Form.Label>
                  <Form.Control readOnly value={this.state.author} />
                </Form.Group>
                <Form.Group controlId="formPlainText">
                  <Form.Label>Requestor</Form.Label>
                  <Form.Control type="text" onChange={this.onChangeRequestor} value={this.state.requestor} placeholder="Who is requesting this ticket?" />
                </Form.Group>
                <Form.Group controlId="formTextArea">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" onChange={this.onChangeDesc} value={this.state.desc} placeholder="Describe the issue." />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Due Date</Form.Label>
                  <br />
                  <DatePicker
                    onChange={this.onChangeDue}
                    selected={this.state.due}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Journal Entries</Form.Label>
                  {this.state.journals.map((value, index) => {
                    return (
                      <div className='mb-2'>
                        <Card key={index}>
                          <Container className='mt-2 mb-2' key={index}>
                            {value}
                          </Container>
                        </Card>
                      </div>
                    );
                  })}
                </Form.Group>
                <Form.Group controlId="formTextArea">
                  <Form.Label>New Journal</Form.Label>
                  <Form.Control as="textarea" onChange={this.onChangeJournal} value={this.state.journal} placeholder="Type a new journal entry." />
                </Form.Group>
                <br />
                <Form.Group>
                  <Button onClick={this.onSaveClick} variant="primary" size="sm" type="submit">
                    Save Changes
                  </Button>
                  {' '}
                  <Button onClick={this.onDeleteClick} variant="danger" size="sm" type="submit">
                    Delete Ticket
                  </Button>
                </Form.Group>
              </Form>
            </Container>
          </Card>
        </Container>
      </div>
    )
  }
}

export default TicketEdit;
