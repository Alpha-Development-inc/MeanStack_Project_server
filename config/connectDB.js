const mongoose = require('mongoose');
const config = require('config');

const dbconnection = config.get('projectDBConnection');

const connectDB = async () => {
    try{
        await mongoose.connect(dbconnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }catch (err){
        console.log('Cannot connect to the database');
    }
};

module.exports = connectDB;