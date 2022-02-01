const express = require('express');

const app = express();

app.use('/users',(req, res, next) => {
    console.log('This is for users.');
    res.send('<h1>Hello Users!</h1>');
    next(); // need to put in next for the first one that is asking for next.
});

app.use('/', (req, res, next) => {
    console.log('For everything else');
    res.send('<h1>Just for everyone</h1>');
});

app.listen(3000);