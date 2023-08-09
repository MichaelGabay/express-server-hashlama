const pool = require("../db/dbMySQLPool")

const userService = {
    async signUpRequest({ name, email, password, role }) {
        const res = await pool.query(
            `
            insert into users (name,email,password,role)
            values(?,?,?,?)
            `
            , [name, email, password, role])


        return res
    },
    async getUserRequest({ email }) {
        const [[user]] = await pool.query(
            `select * from users where email=?`
            , [email])
        return user
    },
    async updateRefreshTojenRequest({ id, token }) {
        const res = await pool.query(
            `insert into tokens (token,user_id)
                values(?,?)
            `, [token, id]
        )
        return res
    },
    async updateDeviceDetails({ browserName, browserVersion, browserPlatform }) {
        const dateNow = new Date();
        const connectionDate = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString()
        const res = await pool.query(
            `insert into device_details (browser_name,browser_version,browser_platform,connection_date)
            values(?,?,?,?)
            `, [browserName, browserVersion, browserPlatform, connectionDate]
        )
    },
    async logoutRequest(token) {
        const res = await pool.query(
            `delete from tokens 
                where token=?
            `, [token]
        )
        return res
    },
    async getUserSafe(id) {
        const [[user]] = await pool.query("select id,name,email,role from users where id=?", [id])
        return user
    }

}

module.exports = userService