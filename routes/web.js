const express = require("express");

const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const homeController = require("../controllers/home");
const voteController = require("../controllers/vote");
const testController = require("../controllers/test");

const router = express.Router();

// @route GET /
router.get('/', homeController.welcome);

// @route GET /home
router.get('/home', homeController.show);

// @route GET /welcome
router.get('/welcome', homeController.index);

// @route GET /login
router.get('/login', loginController.showLoginForm);

// @route GET /login
router.post('/login', loginController.login);

// @route GET /register
router.get('/register', registerController.showRegistrationForm);

// @route GET /register
// router.post('/register', registerController.registerUser);

// @route GET /votes
// @desc Loads votes
router.get('/votes', voteController.index);


// @route POST /votes
// @desc Store vote
router.post('/votes', voteController.store);



// @route GET /votes
// @desc Loads votes
// router.get('/test', testController.index);

module.exports = router;
