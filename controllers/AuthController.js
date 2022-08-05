const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

exports.register = (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (!name || !email || !password || !confirm_password) {
    errors.push({ msg: "All Fields are required." });
  }

  if (password.length < 8) {
    errors.push({ msg: "Password must be minimum 8 characters." });
  }

  if (password.length != confirm_password.length) {
    errors.push({ msg: "Password Confirmation Failed." });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors: errors,
      name: name,
      email: email,
      password: password,
      confirm_password: confirm_password,
    });
  } else {
    //validations passesss.
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          errors.push({ msg: "Email registered Already." });
          res.render("register", {
            errors: errors,
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password,
          });
        }
      })
      .catch((err) => console.log(err));

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.confirm_password = confirm_password;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(() => {
            req.flash(
              "success",
              "You are Registered Successfully! and can Login now"
            );
            res.redirect("/login");
          })
          .catch((err) => console.log(err));
      });
    });
  }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', 
    { successRedirect: '/dashboard',failureRedirect: '/login', failureFlash: true })
    (req, res, next);
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
      });
};
