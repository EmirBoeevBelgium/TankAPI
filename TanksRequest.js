const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Wanna see tanks?');
});

app.get('/api/tanks', (req, res) => {
    res.send(['T-34', 'M1-Abrams', 'Challanger 2']);
})

app.listen(port, () => console.log("Listening on port " + port + "..."));


/*const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Wanna see tanks?');
        res.end();
    }
    if(req.url === '/api/tanks') {
        res.write(JSON.stringify(['T-34', 'M1-Abrams', 'Challanger 2']));
        res.end();
    }
});
server.on('connection', (socket) => {
    console.log('New connection...');
});
server.listen(3000);
console.log('Listening on port 3000...');*/