
require('dotenv').config();

const express = require('express');
const path    = require('path');

const router  = require('./router');
app.use('/', router);

const app  = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
  console.log(` Website running on PORT ${PORT}`);
});

module.exports = app;