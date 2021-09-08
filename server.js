const express = require('express');
const app = express();

const path = require('path');

const publicPath = path.join(__dirname, 'build');

app.use(express.static(publicPath));

app.get('/ping', (req, res) => {
    res.send('pong');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath,  'index.html'));
})

app.listen(3000, () => {
    console.log('server started listening to port 3000');
})