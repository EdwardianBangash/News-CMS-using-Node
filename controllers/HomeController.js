const axios = require("axios");
const { response } = require("express");

exports.index = async (req, res) => {
  try {
    let categories = [];
    let blogs = [];

    await axios
      .get("http://127.0.0.1:8000/apiAllCategories")
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
            categories.push(response.data[index]);
        }
      });

      // await axios
      // .get("http://127.0.0.1:8000/apiAllBlogs")
      // .then((response) => {
      //   for (let index = 0; index < response.data.length; index++) {
      //       blogs.push(response.data[index]);
      //   }
      // });

    res.render("welcome", {
      categories: categories,
      // blogs: blogs
    });
  } catch (error) {}
};
