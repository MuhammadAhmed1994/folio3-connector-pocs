const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/api-router');
const appRouter = require('./routes/app-router');
const bodyParser = require('body-parser');
const usery = require('./models/user-model');
const kueUiExpress = require('kue-ui-express');
const kue = require('kue');


kueUiExpress(app, '/kue/', '/kue-api/');
// Mount kue JSON api
app.use('/kue-api/', kue.app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', apiRouter);
app.use('/', appRouter);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views/'));

let server = http.createServer(app);
server.listen(3000, (err) => {
    if (!!err) {
        console.log("error occured in creating server ==>", err)
    } else {
        console.log("server created sucessfully");
    }
});