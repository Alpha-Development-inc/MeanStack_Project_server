const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/api/authRoute');
const postRoute = require('./routes/api/postRoute');
const commentRoute = require('./routes/api/commentRoute');
const messageRoute = require('./routes/api/messageRoute');
const todoRoutes = require('./routes/api/CategorieRoute');
const contactUsRoutes=require('./routes/api/ContactUsFormRoute');
const aboutUsRoutes=require('./routes/api/AboutUsRoute');
const connectDB = require('./config/connectDB');

const app = express();

connectDB();

app.use(express.json());
//allow cross origin requests
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/messages', messageRoute);
app.use('/api/categories', todoRoutes);
app.use('/api/contactus', contactUsRoutes);
app.use('/api/aboutus', aboutUsRoutes);

app.listen(4000, () => {
    console.log('Connected to the server');
});