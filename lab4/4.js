//mongodb start
// 1-https://www.mongodb.com/try
// 2-sign up
// 3-create free cluster
// 4-create user
// 5-get the link for user
// 6-create config directory and add user
// npm i express mongoose config
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const User = require('./models/User');
const app = express();

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


const newUser = new User({
  name: 'UCR student 1',
})
newUser
  .save()
  .then(item => console.log(item))
  .catch(err => console.log(err));