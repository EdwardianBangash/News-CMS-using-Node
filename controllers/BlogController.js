const Blog = require("../models/Blog");

exports.index = (req, res) => {
  Blog.find({}).then((result) => {
    res.render("Dashboard/allBlogs", { blogs: result });
  });
};

exports.apiAllBlogs = (req, res) => {
  Blog.find({}).then((result) => {
    res.send(result);
  });
}

exports.showBlog = (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("Dashboard/showBlog", { blogs: result });
    })
    .catch((err) => {
      res.redirect("/allBlogs");
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

exports.editBlog = (req, res) => {
  Blog.findById(req.params.id)
    .then((result) => {
      res.render("Dashboard/editBlog", { blog: result, id: req.params.id });
    })
    .catch((err) => {
      res.redirect("/allBlogs");
    });
};

exports.update = (req, res) => {
  let errors = [];
  const { title, description, category } = req.body;
  let thumbnail = typeof req.file  == 'undefined' ? req.body.old_image : req.file.filename;
  const id = req.body.id;

  if (!title || !description || !category || !thumbnail) {
    errors.push({ msg: "All Fields are required" });
  }

  if (errors.length > 0) {
    res.render("Dashboard/editBlog", {
      errors: errors,
      title: title,
      description: description,
      thumbnail: thumbnail,
      id: id,
    });
  } else {
    Blog.findOneAndUpdate(
      {_id:id},
      {
        title: title,
        description: description,
        thumbnail: thumbnail,
        category: category,
      },
      (err, result) => {
        if(err) throw err;
        if(result){
          res.redirect("/allBlogs");
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  Blog.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) throw err;
    if (result) {
      res.redirect("/allBlogs");
    }
  });
};
