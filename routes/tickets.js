const router = require('express').Router();
let Ticket = require('../models/ticket');

router.route('/api/tickets').get((req, res) => {
  Ticket.find()
  .then(tickets => res.json(tickets))
  .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/api/tickets').post((req, res) => {
  const desc = req.body.desc;
  const requestor = req.body.requestor;
  const author = {
    username: req.body.author.username
  };
  const due = req.body.due;

  const newTicket = new Ticket({
    desc,
    requestor,
    author,
    due
  });

  newTicket.save()
  .then(() => res.json('Ticket added.'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/api/tickets/:id').get((req, res) => {
  Ticket.findById(req.params.id)
  .then(ticket => res.json(ticket))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/api/tickets/:id').delete((req, res) => {
  Ticket.findByIdAndDelete(req.params.id)
  .then(ticket => res.json('Ticket Deleted.'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/api/tickets/:id').put((req, res) => {
  Ticket.findById(req.params.id)
  .then(ticket => {
    ticket.desc = req.body.desc;
    ticket.requestor = req.body.requestor;
    ticket.author = {
      username: req.body.author.username
    }
    ticket.due = req.body.due;
    ticket.journals = req.body.journals

    ticket.save()
    .then(() => res.json('Ticket Updated.'))
    .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
