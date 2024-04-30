/* eslint-disable no-undef */
// server.js
// eslint-disable-next-line no-undef
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Import your data
const data = require('./jobs.json');

// Define your endpoints
app.get('/jobs', (req, res) => {
  const limit = parseInt(req.query._limit);
  if (limit) {
    res.json(data.jobs.slice(0, limit));
  } else {
    res.json(data.jobs);
  }
});

app.get('/jobs/:id', (req, res) => {
  const job = data.jobs.find(job => job.id === req.params.id);
  if (job) {
    res.json(job);
  } else {
    res.status(404).send('Job not found');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));