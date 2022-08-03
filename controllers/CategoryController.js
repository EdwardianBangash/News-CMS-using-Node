const Category = require("../models/Category");

exports.allCategories = (req, res) => {
  Category.find({})
    .then((result) => {
      res.render("Dashboard/allCategories", {
        categories: result,
      });
    })
    .catch((err) => console.error(err));
};

exports.addCategories = (req, res) => {
  let errors = [];

  if (!req.body.category_name) {
    errors.push({ msg: "Category name is required" });
    res.render("Dashboard/addCategories", { errors: errors });
  }

  Category.create({
    category_name: req.body.category_name,
  })
    .then(() => {
      res.render("Dashboard/addCategories", {
        success: "Category Added successfully",
      });
    })
    .catch((err) => console.error(err));
};

exports.findCategory = (req, res) => {
  Category.findById(req.query.id)
    .then((result) => {
      res.render("Dashboard/editCategory", {
        category_name: result.category_name,
        category_id: result._id,
      });
    })
    .catch((err) => console.error(err));
};

exports.editCategory = (req, res) => {
  if (!req.body.category_name || !req.body.category_id) {
    res.redirect("/allCategories");
  }

  Category.findOneAndUpdate(
    { _id: req.body.category_id },
    { category_name: req.body.category_name },
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.redirect("/allCategories");
      }
    }
  );
};

exports.deleteCategory = (req, res) => {
  Category.findOneAndDelete({ _id: req.query.id }, (err, result) => {
    if (err) throw err;
    if (result) {
      res.redirect("/allCategories");
    }
  });
};
