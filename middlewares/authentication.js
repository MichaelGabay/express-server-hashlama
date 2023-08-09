const jwt = require("jsonwebtoken")
require("dotenv").config();
const { checkRefreshToken } = require("../services/authService")
const { accessTokenExpires } = require("../config.json")

const auth = async (req, res, next) => {
    const error = { message: "you must be logged in", status: 401 }
    const accessCookie = req.cookies.accessCookie;
    if (!accessCookie) return next(error);
    const accessToken = accessCookie.split(" ")[1];
    try {
        const user = jwt.verify(accessToken, process.env.SECRET_KEY)
        req.user = user;
        return next();
    }
    catch {
        const refreshCookie = req.cookies.refreshCookie;
        if (!refreshCookie) return next(error);
        const refreshToken = refreshCookie.split(" ")[1];
        try {
            const payload = jwt.verify(refreshToken, process.env.SECRET_KEY);
            req.user = payload;
            const refreshInDB = await checkRefreshToken({ id: payload.id, token: refreshToken })
            if (refreshToken != refreshInDB) return next(error);
            const newAccessToken = jwt.sign({ id: payload.id }, process.env.SECRET_KEY, { expiresIn: accessTokenExpires });
            res.cookie("accessCookie", "bearer " + newAccessToken, { sameSite: "None", secure: true })
            next()
        }
        catch {
            return next(error)
        }

    }


}



module.exports = auth