const mongoose = require("mongoose");


const ticketSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true
  },
  requestor: {
    type: String,
    required: true
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  due: {
    type: Date
  },
  journals: [
     {
       type: String,
     }
  ]
})

module.exports = mongoose.model('Ticket', ticketSchema);
