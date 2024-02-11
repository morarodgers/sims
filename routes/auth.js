/*const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  logonShow,
  registerShow,
  registerDo,
  logoff,
} = require("../controllers/auth");

router.route("/register").get(registerShow).post(registerDo);
router
  .route("/logon")
  .get(logonShow)
  .post(
     passport.authenticate("local", {
       successRedirect: "/",
       failureRedirect: "/sessions/logon",
       failureFlash: true,
     })
  );
router.route("/logoff").post(logoff);
*/

const express = require('express')
const router = express.Router()

const {login, register} = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)

module.exports = router;