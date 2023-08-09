const router = require("express").Router();
const { signup, login, showAllConnections, logout, checkConnection } = require("../controllers/userController");
const auth = require("../middlewares/authentication");



// signup route
router.post("/signup", signup)

router.post("/login", login)

router.get("/showAllConnections", auth, showAllConnections)

router.post("/logout", logout)
router.get("/checkConnection", auth, checkConnection)


module.exports = router;