// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const Room = require('./models/Rooms');
const Message = require('./models/Message');

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up stylesheets route

// TODO: Add server side code

// Create controller handlers to handle requests at each endpoint

/*
ROOM APIs
*/
app.post("/create", function(req, res){
    const newRoom = new Room({
        name: req.body.roomName
    })
    newRoom.save().then(console.log("room added"))
    .catch(e => console.log(e))
})
app.get("/getroom", function(req, res){
    Room.find().lean().then(items => {
        res.json(items)
    })
})
app.get('/', homeHandler.getHome);
app.get('/:roomName', roomHandler.getRoom);

/*
MESSAGE APIs
*/
app.post("/message/create", function(req, res){
    const newMessage = new Message({
        name:req.body.messageName,
        username:body.username,
        contents:req.body.messageContent
    })
    newMessage.save().then(console.log("Message recorded"))
    .catch(error => console.log(error))
})
app.get("/messages", function(req, res){
    Message.find().lean().then(items => {
        res.json(items)
    })
})


// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));