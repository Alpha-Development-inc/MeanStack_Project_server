const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/api/authRoute');
const postRoute = require('./routes/api/postRoute');
const commentRoute = require('./routes/api/commentRoute');

const connectDB = require('./config/connectDB');

const app = express();

connectDB();

app.use(express.json());
//allow cross origin requests
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

app.listen(4000, () => {
    console.log('Connected to the server');
});