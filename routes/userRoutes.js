const router = require("express").Router();
const { signup, login, showAllConnections, logout, checkConnection, endConnection, endAllConnectios } = require("../controllers/userController");
const auth = require("../middlewares/authentication");



// signup route
router.post("/signup", signup)

router.post("/login", login)

router.get("/showAllConnections", auth, showAllConnections)

router.post("/logout", logout)
router.get("/checkConnection", auth, checkConnection)

router.delete("/endConnection", auth, endConnection, logout)
router.delete("/endAllConnections", auth, endAllConnectios, logout)


module.exports = router;