const mongoose = require('mongoose');


const AboutUsSchema = new mongoose.Schema({
history:{
    type: String
}
,
address:{
    type:String
},
email: {
    type: String,
    required: true,
},
description: {
    type: String,
},
  
});

module.exports = mongoose.model('AboutUs', AboutUsSchema);