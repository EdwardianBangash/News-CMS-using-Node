const router = require('express').Router();
const AuthController = require('../controllers/AuthController')

router.get('/', (req, res) => {
    res.render("welcome");
});


router.get('/login', AuthController.login);
router.get('/register', AuthController.register);



module.exports = router;