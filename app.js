const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

// Create express app
const app = express();

console.log(process.env.DATABASE_PASSWORD);
// Database
mongoose.connect(
  'mongodb+srv://SarbjotSingh:' +
    process.env.DATABASE_PASSWORD +
    '@cluster0.w61qd.mongodb.net/' +
    process.env.DATABASE_NAME +
    '?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB database...');
});

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const QuotesRoute = require('./routes/Quotes');

app.use('/quotes', QuotesRoute);

// Starting server
const port = process.env.port || 3000;
app.listen(port, console.log('Listening on port 3000'));
