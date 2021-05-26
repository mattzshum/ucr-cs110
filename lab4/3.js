// handlebars
// npm install --save express express-handlebars
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    res.render('home', {
        post: {
            author: 'Janith Kasun',
            image: 'https://picsum.photos/500/500',
            comments: []
        }
    });
});

app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});