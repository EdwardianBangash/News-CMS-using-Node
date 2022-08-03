const Category = require("../models/Category");
const Blog = require("../models/Blog");

exports.index = (req, res) => {
    let categories = [];
    let blogs = [];

    Category.find({})
    .then((result) => { 
        categories.push(result)
    })
    .catch((err) => console.error(err));

    Blog.find({})
    .then((result) => { 
        blogs.push(result)
    })
    .catch((err) => console.error(err));

    res.render("welcome", {
        categories: categories,
        blogs: blogs,
    });
}