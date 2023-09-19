const express = require('express');
const shortid = require('shortid');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// In-memory database for URL mappings
const urlDatabase = {};

// Endpoint to shorten a URL
app.post('/shorten', (req, res) => {
  const { longUrl } = req.body;
  const shortUrl = shortid.generate();

  urlDatabase[shortUrl] = longUrl;

  res.json({ shortUrl });
});

// Endpoint to redirect to the original URL
app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;
  const longUrl = urlDatabase[shortUrl];

  if (!longUrl) {
    return res.status(404).json({ error: 'URL not found' });
  }

  res.redirect(longUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
