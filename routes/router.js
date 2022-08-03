const router = require('express').Router();
const AuthController = require('../controllers/AuthController')
const CategoryController = require('../controllers/CategoryController')
const HomeController = require('../controllers/HomeController')

router.get('/', HomeController.index);

router.get('/dashboard', (req,res) => {
    res.render("Dashboard/index");
});

router.get('/allCategories', CategoryController.allCategories);

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



module.exports = router;