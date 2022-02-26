const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const Quote = require('./models/Quotes');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Quotes API',
      version: '1.0.0',
    },
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

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

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /all:
 *   get:
 *     description: Get all quotes
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.get('/all', async (req, res) => {
  const quotes = await Quote.find();

  res.json(quotes);
});

/**
 * @swagger
 * /amount/{count}:
 *  get:
 *    parameters:
 *      - name: count
 *        in: path
 *        description: Number of quotes
 *        required: true
 *        type: integer
 *    description: Return certain number of quotes
 *    responses:
 *      '200':
 *        description: Success
 *
 */
app.get('/amount/:count', async (req, res) => {
  const quotes = await Quote.find();
  let randomSubset = getRandomSubarray(quotes, req.params.count);
  res.json(randomSubset);
});

/**
 * @swagger
 * /get/{id}:
 *  get:
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of quote
 *        required: true
 *        type: string
 *    description: Return quote by ID
 *    responses:
 *      '200':
 *        description: Success
 *
 */
app.get('/get/:id', async (req, res) => {
  const q = await Quote.findById({ _id: req.params.id });

  res.json(q);
});

/**
 * @swagger
 * /random:
 *   get:
 *     description: Get random quote
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.get('/random', async (req, res) => {
  const count = await Quote.countDocuments();
  const random = Math.floor(Math.random() * count);
  const q = await Quote.findOne().skip(random);

  res.json(q);
});

/**
 * @swagger
 * /author/{name}:
 *  get:
 *    parameters:
 *      - name: name
 *        in: path
 *        description: Name of author
 *        required: true
 *        type: string
 *    description: Get quotes by certain author
 *    responses:
 *      '200':
 *        description: Success
 *
 */
app.get('/author/:name', async (req, res) => {
  const quotes = await Quote.find();
  let filteredQuotes = quotes.filter(function isAuthor(quote) {
    let quoteAuthor = quote.author.trim().toLowerCase().replace(/ /g, '');
    let paramAuthor = req.params.name.trim().toLowerCase().replace(/ /g, '');

    return quoteAuthor === paramAuthor;
  });
  res.json(filteredQuotes);
});

/**
 * @swagger
 * /authors:
 *   get:
 *     description: Get all authors of quotes
 *     responses:
 *       200:
 *         description: Success
 *
 */
app.get('/authors', async (req, res) => {
  const quotes = await Quote.find();
  const authors = quotes.map((quote) => quote.author);
  const filteredAuthors = authors.filter(
    (author) => author.trim().toLowerCase() !== 'unknown',
  );
  let uniqueAuthors = [...new Set(filteredAuthors)];
  res.json(uniqueAuthors);
});
// private
app.post('/new', async (req, res) => {
  const newQuote = new Quote(req.body);

  const savedQuote = await newQuote.save();

  res.json(savedQuote);
});

// Starting server
const port = process.env.PORT || 3000;
app.listen(port, console.log('Listening on port ' + port));

function getRandomSubarray(arr, size) {
  var shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}
