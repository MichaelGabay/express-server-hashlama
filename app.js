const express = require("express");
require("dotenv").config()
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
const mainRouter = require("./routes/indexRoutes")

app.use(cors({
    methods: ["GET", "POST", "DELETE", "PUT"],
    origin: ["http://localhost:5173"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())


app.use(mainRouter)




const port = process.env.PORT;

app.listen(port, () => console.log("server running on port " + port))