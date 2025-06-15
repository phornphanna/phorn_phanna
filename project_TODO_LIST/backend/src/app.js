const express = require('express'); 
const cors = require('cors');
const app = express();
const routes = require('./routes/api');
const path = require('path');

require('dotenv').config();
app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// call route 
app.use('/api', routes);


app.listen(process.env.PORT , () => {
     console.log(`Server Running on port ${process.env.PORT}`);
});