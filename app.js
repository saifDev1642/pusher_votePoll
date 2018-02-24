const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//Database config
require('./config/db');

const app = express();

const poll = require('./routes/poll');

//Set Public Folder
app.use(express.static(path.join(__dirname,'public')));

//Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//Enable Cors
app.use(cors());

app.use('/poll',poll);

const port = 3000;

//start Server
app.listen(port, ()=> console.log(`server started at port ${port}`));