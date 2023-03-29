// Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Create express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Simple Form</title>
      </head>
      <body>
        <h1>Simple Form</h1>
        <form method="post" action="/submit">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name"><br>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email"><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  // Process form data here
  res.send(`Thanks for submitting the form, ${name}!`);
});