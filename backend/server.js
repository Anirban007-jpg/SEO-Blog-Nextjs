const express = require('express');
const morgan = require('morgan');
const bp = require('body-parser');
const cp = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()


// app
const app = express();


// middlewares
app.use(morgan('dev'))
app.use(bp.json())
app.use(cp())

//cors
app.use(cors());

// routes
app.get('/api', (req,res)=> {
    res.json({time: Date().toString()})
});

// middlewares


// handle port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

