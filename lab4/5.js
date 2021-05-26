const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const User = require('./models/User');
const exphbs = require('express-handlebars');
const app = express();

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    User.find()
    .sort({ date: -1 })
    .then(items => {    res.render('home', {
        post: {
            author: items[0].name,
            image: 'https://picsum.photos/500/500',
            comments: []
        }
    });});

});

app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});