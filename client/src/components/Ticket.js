import React from 'react';


class Ticket extends React.Component {
  // This component gets information about one ticket as a prop,
  // then returns a  row for the ticket table.
  constructor(props) {
    super(props);

    this.onTicketClick = this.onTicketClick.bind(this);
  }

  // If user clicks on a ticket's row,
  // they go to that ticket's edit route.
  onTicketClick = (event) => {
    this.props.history.push('/tickets/' + this.props.id)
  }

  render () {
    return(
      <tr onClick={this.onTicketClick}>
        <td>{this.props.id.substring(this.props.id.length - 6, this.props.id.length).toUpperCase()}</td>
        <td>{this.props.requestor}</td>
        <td>
          {this.props.desc.length > 40 &&
            this.props.desc.substring(0, 40) + "..."
          }
          {this.props.desc.length < 40 &&
            this.props.desc
          }
        </td>
        <td>{this.props.author}</td>
        <td>{this.props.created.split('T')[0]}</td>
        <td>{this.props.due.split('T')[0]}</td>
      </tr>
    );
  }
}

export default Ticket;
