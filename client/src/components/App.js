import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TicketDashboard from './TicketDashboard';
import TicketEdit from './TicketEdit';
import TicketNew from './TicketNew';


const App = () => {
  // Initialize React Router with routes to Read, Create,
  // and Update/Delete components.
  return (
    <div>
      <br />
      <br />
      <br />
      <Router>
        <Route path='/' exact component={TicketDashboard} />
        <Route path='/new' exact component={TicketNew} />
        <Route path='/tickets/:id' exact component={TicketEdit} />
      </Router>
      <br />
      <br />
    </div>
  );
};


export default App;
