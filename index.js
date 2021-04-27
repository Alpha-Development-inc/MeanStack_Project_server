const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/api/authRoute');
const postRoute = require('./routes/api/postRoute');
const commentRoute = require('./routes/api/commentRoute');
const messageRoute = require('./routes/api/messageRoute');
const categoryRoutes = require('./routes/api/categorieRoute');
const filterPostRoutes = require('./routes/api/filterPostRoute');
const connectDB = require('./config/connectDB');
const trendingRoutes=require('./routes/api/trendingRoute');


const app = express();

connectDB();

app.use(express.json({limit: '50mb'}));
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('server started');
});