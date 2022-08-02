const mysql = require('../connection')
const handleLogout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        console.log("logout Successfully")
    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = handleLogout