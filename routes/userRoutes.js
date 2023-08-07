const router = require("express").Router();
const { signup, login, showAllConnections } = require("../controllers/userController");
const auth = require("../middlewares/authentication");



// signup route
router.post("/signup", signup)

router.post("/login", login)

router.get("/showAllConnections", auth, showAllConnections)

module.exports = router;