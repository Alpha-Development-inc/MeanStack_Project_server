const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/api/authRoute');
const postRoute = require('./routes/api/postRoute');
const commentRoute = require('./routes/api/commentRoute');
const messageRoute = require('./routes/api/messageRoute');
const categoryRoutes = require('./routes/api/categorieRoute');
const filterPostRoutes = require('./routes/api/filterPost');
const connectDB = require('./config/connectDB');
const trendingRoutes=require('./routes/api/trending');


const app = express();

connectDB();

app.use(express.json());
app.use(express.static('images'));
//allow cross origin requests
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);
app.use('/api/messages', messageRoute);
app.use('/api/categories', categoryRoutes);
app.use('/api/filterPostByCategory',filterPostRoutes);
app.use('/api/top10',trendingRoutes);
//app.use('/api/contactus', contactUsRoutes);
//app.use('/api/aboutus', aboutUsRoutes);


app.listen(4000, () => {
    console.log('Connected to the server');
});