const express = require('express');
const morgan = require('morgan');
const bp = require('body-parser');
const cp = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


// bring in routes
const authRoutes = require('./routes/auth');


// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true}).then(() => console.log('DB connected'));

// middlewares
app.use(morgan('dev'))
app.use(bp.json())
app.use(cp())

//cors
if(process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));    
}


// routes



app.use('/api', authRoutes);

// middlewares


// handle port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

