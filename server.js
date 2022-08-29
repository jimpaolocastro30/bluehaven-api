const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
global.__basedir = __dirname;   

// bring routes

const anchorSagrod = require('./routes/anchorSagrod');


// app
const app = express();

//db

mongoose
.connect(process.env.DATABASE, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true})
.then(() => console.log('Succefully Login!'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'))
// cors

if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `*` }));
}

// routes


app.use('/api', anchorSagrod);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
