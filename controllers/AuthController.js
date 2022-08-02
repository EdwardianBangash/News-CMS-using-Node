const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = (req, res) => {
    res.render('register');
};

exports.login = (req, res) => {
    res.render("login");
};

exports.logout = (req, res) => {};
