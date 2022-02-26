// const express = require('express');
// const router = express.Router();
// const Quote = require('../models/Quotes');

// // Get all routes
// router.get('/all', async (req, res) => {
//   const quotes = await Quote.find();

//   res.json(quotes);
// });

// // Search by content
// // /quote?amount=5
// router.get('/amount', async (req, res) => {
//   console.log('count is ' + req.query.count);
//   const quotes = await Quote.find();
//   let randomSubset = getRandomSubarray(quotes, req.query.count);
//   res.json(randomSubset);
// });

// // Create new quote
// router.post('/new', async (req, res) => {
//   const newQuote = new Quote(req.body);

//   const savedQuote = await newQuote.save();

//   res.json(savedQuote);
// });

// // Get specific quote
// router.get('/get/:id', async (req, res) => {
//   const q = await Quote.findById({ _id: req.params.id });

//   res.json(q);
// });

// // Get random quote
// router.get('/random', async (req, res) => {
//   const count = await Quote.countDocuments();
//   const random = Math.floor(Math.random() * count);
//   const q = await Quote.findOne().skip(random);

//   res.json(q);
// });

// // Search by author
// // /quote/author?name=Kobe Bryant
// router.get('/author', async (req, res) => {
//   const quotes = await Quote.find();
//   let filteredQuotes = quotes.filter(function isAuthor(quote) {
//     let quoteAuthor = quote.author.trim().toLowerCase().replace(/ /g, '');
//     let paramAuthor = req.query.name.trim().toLowerCase().replace(/ /g, '');

//     return quoteAuthor === paramAuthor;
//   });
//   res.json(filteredQuotes);
// });

// // Get all authors
// // /quote/authors
// router.get('/authors', async (req, res) => {
//   const quotes = await Quote.find();
//   const authors = quotes.map((quote) => quote.author);
//   const filteredAuthors = authors.filter(
//     (author) => author.trim().toLowerCase() !== 'unknown',
//   );
//   let uniqueAuthors = [...new Set(filteredAuthors)];
//   res.json(uniqueAuthors);
// });

// module.exports = router;

// function getRandomSubarray(arr, size) {
//   var shuffled = arr.slice(0),
//     i = arr.length,
//     temp,
//     index;
//   while (i--) {
//     index = Math.floor((i + 1) * Math.random());
//     temp = shuffled[index];
//     shuffled[index] = shuffled[i];
//     shuffled[i] = temp;
//   }
//   return shuffled.slice(0, size);
// }
