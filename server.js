const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/annidev-client'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/annidev-client/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});