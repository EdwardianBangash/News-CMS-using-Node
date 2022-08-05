const dotenv = require("dotenv");
const express = require('express');
const path = require('path');
const router = require('./routes/router');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

dotenv.config();

const app = express();

require('./config/passport')(passport);

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());



app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, 'assets/css')))
app.use('/js', express.static(path.join(__dirname, 'assets/js')))
app.use('/images', express.static(path.join(__dirname, 'assets/images')))


app.use(router);

//Database Connection 
mongoose.connect(process.env.MongoURI).then(() => {
    console.log('Database Connected Successfully');
});


app.use(function(req,res){
    res.status(404).render('404');
  });


const PORT = process.env.PORT || 8000
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});