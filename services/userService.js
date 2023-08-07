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
    }

}

module.exports = userService