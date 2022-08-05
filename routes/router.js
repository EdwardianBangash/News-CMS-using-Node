const router = require('express').Router();
const AuthController = require('../controllers/AuthController')
const CategoryController = require('../controllers/CategoryController')
const HomeController = require('../controllers/HomeController')
const BlogController = require('../controllers/BlogController')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/images/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/', HomeController.index);

router.get('/dashboard', (req,res) => {
    res.render("Dashboard/index");
});

router.get('/allCategories', CategoryController.allCategories);
router.get('/apiAllCategories', CategoryController.apiAllCategories);

router.get('/addCategories', (req,res) => {
    res.render("Dashboard/addCategories");
});

router.get('/editCategory', CategoryController.findCategory);

router.get('/login', AuthController.login);
router.get('/register', AuthController.register);

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

router.post('/addCategories', CategoryController.addCategories);
router.post('/editCategory', CategoryController.editCategory);
router.get('/deleteCategory', CategoryController.deleteCategory);

//blogs routes..
router.get('/allBlogs', BlogController.index);
router.get('/addBlog', BlogController.create);
router.get('/showBlog/:id', BlogController.showBlog);
router.get('/editBlog/:id', BlogController.editBlog);
router.get('/deleteBlog/:id', BlogController.delete);

//api routes
router.post('/addBlog',upload.single('thumbnail'), BlogController.store);
router.post('/updateBlog',upload.single('thumbnail'), BlogController.update);
router.post('/apiAllBlogs',BlogController.apiAllBlogs);




module.exports = router;