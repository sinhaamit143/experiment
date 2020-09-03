//importing packages
const express = require('express');
const router = express.Router();
const passport = require('passport');
const cookieSession = require('cookie-session')
require('../config/passport-setup');
const checkAuth = require('../middleware/check-auth')

// Initializes passport and passport sessions
router.use(passport.initialize());
router.use(passport.session());

router.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

//importind user.js from models
const UserController = require('../controllers/user');

router.post("/test",checkAuth, UserController.user_test);

//----Creating a new User----
router.post("/signup", UserController.user_signup );

//----login function for userlogin----
router.post('/login',  UserController.user_login );
router.get('/failed', (req, res) => res.send('You Failed to log in!'))
router.get('/good', (req, res) => 
{
  //res.send(`Welcome mr ${req.user.displayName}!`);
  console.log(req.user);
});
//----login with google ----login
router.get("/auth/google",  passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/user/good');
  }
);

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


// Deleting a User
router.delete('/:userId', UserController.user_delete);

//EXPORTING THE MODULE
module.exports = router;