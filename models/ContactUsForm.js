const mongoose = require('mongoose');


const ContactUsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  
});

module.exports = mongoose.model('ContactUs', ContactUsSchema);