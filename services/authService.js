const pool = require("../db/dbMySQLPool")

const authService = {
    async checkRefreshToken({ id, token }) {
        const res = await pool.query(`
    SELECT token
    from tokens
    where user_id=? and token =?
`, [id, token])
        return res[0][0]?.token ? token : null
    }
}

module.exports = authService