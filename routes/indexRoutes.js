const router = require("express").Router()
const userRouter = require("./userRoutes")



router.use("/user", userRouter)

// error handler
router.use((err, req, res, next) => {
    const { status, message, stack } = err;
    const error = {
        message: message ? message : "internal error",
        status: status ? status : "500"
    }
    if (stack) error.stack = stack;
    if (process.env.MODE == "development") {
        return res.status(status ?? 500).json(
            error
        )
    }
    error.message = "there is error";
    delete error.stack;
    res.status(status).json(
        error
    )
})




module.exports = router

