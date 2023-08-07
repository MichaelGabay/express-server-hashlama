const bcrypt = require("bcrypt");
const { signUpRequest, getUserRequest, updateRefreshTojenRequest } = require("../services/userService")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const { accessTokenExpires, refreshTokenExpires } = require("../config.json")

const userCtrl = {
    async signup({ body }, res, next) {
        try {
            body.password = await bcrypt.hash(body.password, 10)
            body.role = "user";
            await signUpRequest(body)

            res.status(201).send("user craeted successfully");
        }
        catch (error) {
            console.log(error);
            if (error.errno == 1062) {
                return res.status(409).json({ msg: "user already exsist", error });
            }
            res.status(500).send({ msg: "ther is error", error });
        }
    },
    async login({ body }, res, next) {
        try {
            const user = await getUserRequest(body);
            if (!user) return next({ message: "user not found", status: 404 })
            const isCorrect = await bcrypt.compare(body.password, user.password)

            if (!isCorrect) return next({ status: 401, message: "incorrect password" })

            const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: accessTokenExpires });
            const refreshToken = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: refreshTokenExpires });
            res.cookie("accessCookie", "bearer " + accessToken, { sameSite: "None", secure: true })
            res.cookie("refreshCookie", "bearer " + refreshToken, { httpOnly: true, sameSite: "None", secure: true })

            await updateRefreshTojenRequest({ id: user.id, token: refreshToken })
            res.status(200).send("user logged in")
        } catch (error) {
            if (error.errno == 1064) {
                return next({ status: 400, message: "invalid sql syntax", stack: error })
            }
            next({ msg: "internal error" })
        }
    },
    async showAllConnections(req, res, next) {
        return res.json(req.user.id)

    }

}


module.exports = userCtrl


