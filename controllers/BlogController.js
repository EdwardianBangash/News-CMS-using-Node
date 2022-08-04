const Blog = require("../models/Blog");

exports.index = (req, res) => {
  Blog.find({}).then((result) => {
    res.render("Dashboard/allBlogs", { blogs: result });
  });
};

exports.create = (req, res) => {
  res.render("Dashboard/addBlog");
};

exports.store = (req, res) => {
  let errors = [];
  const { title, description, category } = req.body;
  const thumbnail = req.file.filename;

  if (!title || !description || !category || !thumbnail) {
    errors.push({ msg: "All Fields are required" });
  }

  if (errors.length > 0) {
    res.render("Dashboard/addBlog", {
      errors: errors,
      title: title,
      description: description,
      thumbnail: thumbnail,
    });
  } else {
    Blog.create({
      title: title,
      description: description,
      thumbnail: thumbnail,
      category: category,
    })
      .then(() => {
        res.render("Dashboard/addBlog", {
          success: "Blog Added Successfully.",
        });
      })
      .catch((err) => console.log(err));
  }
};

exports.delete = (req, res) => {
  Blog.findOneAndDelete({ _id: req.query.id }, (err, result) => {
    if (err) throw err;
    if (result) {
      res.redirect("/allBlogs");
    }
  });
};
