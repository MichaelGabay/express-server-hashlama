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
    async addRefreshToken({ id, token }) {
        const [{ insertId }] = await pool.query(
            `insert into tokens (token,user_id)
                values(?,?)
            `, [token, id]
        )
        return insertId
    },
    async updateDeviceDetails({ browserName, browserVersion, browserPlatform }, tokenId) {
        const dateNow = new Date();
        const connectionDate = dateNow.toLocaleDateString() + " " + dateNow.toLocaleTimeString()
        const res = await pool.query(
            `insert into device_details (browser_name,browser_version,browser_platform,connection_date,token_id)
            values(?,?,?,?,?)
            `, [browserName, browserVersion, browserPlatform, connectionDate, tokenId]
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
    },
    async getAllConnectionsRquest(id) {
        const [res] = await pool.query(
            `select t.id as token_id, browser_name,browser_platform,browser_version,connection_date
            from tokens as t
            join device_details as d on t.id=d.token_id
            where user_id=?`
            , [id])
        return res
    },
    async endConnectionRequest(id) {
        const res = await pool.query(
            `delete from tokens where id=?`
            , [id])
        return res
    },
    async endAllConnectionRequest(id) {
        const res = await pool.query(
            `delete from tokens where user_id=?`
            , [id])
        return res
    },


}

module.exports = userService