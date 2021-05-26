//basic express server

const express = require('express');
const app = express();

app.get('/', (req,res) => {
  res.send("Hello world2!");
});

app.listen(process.env.port || 3000, function(){ // for heroku
  console.log('Web Server is listening at port '+ (process.env.port || 3000));
});
