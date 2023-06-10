const express = require('express');
const path = require('path');
const app = express();

const appPath = path.join(__dirname, 'dist', 'annidev-client');
const port = process.env.PORT || 8080;

app.use(express.static(appPath));

app.all('*', (req, res) => {
  res.status(200).sendFile('/', { root: appPath });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});