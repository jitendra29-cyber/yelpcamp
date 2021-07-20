require('dotenv').config();
const   mongoose = require("mongoose");
const   assert = require('assert');
const   db_url = process.env.DB_URL;

mongoose.connect(
    db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    function(error, link){
           assert.equal(error, null, 'db connection fail');
           console.log('db is connected..')
           console.log(link)
        }
);
