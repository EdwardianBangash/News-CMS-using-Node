const router = require('express').Router();
const AuthController = require('../controllers/AuthController')

router.get('/', (req, res) => {
    res.render("welcome");
});


router.get('/login', AuthController.login);
router.get('/register', AuthController.register);

router.get('/dashboard', (req,res) => {
    res.render("Dashboard/index");
});

router.get('/allCategories', (req,res) => {
    res.render("Dashboard/allCategories");
});

router.get('/addCategories', (req,res) => {
    res.render("Dashboard/addCategories");
});



module.exports = router;