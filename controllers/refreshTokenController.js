const mysql = require('../connection')
const jwt = require('jsonwebtoken')
require('dotenv').config();


const hadleRefeshToken = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt)
    if (!cookies?.jwt) return res.sendStatus(401)
    console.log("asdasasd")
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    mysql.query(`Select * from  user where rToken= '${refreshToken}'`, (err, results, fields) => {
        if (err) console.log(err);
        let foundUser = results[0];
        if (!foundUser) return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {

                //    console.log(decoded)
                if (err || foundUser.user_name !== decoded.name) return res.sendStatus(403)
                const accessToken = jwt.sign(
                    { 'name': decoded.name },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1m' }
                );
                res.json({
                    aToken: accessToken,
                     foundUser
                })
            }
        )
    })

}

module.exports = hadleRefeshToken