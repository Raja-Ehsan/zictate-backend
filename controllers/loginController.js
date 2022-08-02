require('dotenv').config()
const mysql = require('../connection')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')
const handleLogin = async (req, res) => {
    const username = req.body.user;
    const password = req.body.password;
    mysql.query(`Select * from user where user_name= '${username}'`, (err, result, fields) => {
        if (err) console.log(err)
        else {
            const isMatch=  bcrypt.compare(password,result[0].password)
            isMatch.then((results)=>{
                if(result[0] && results)
                {
                    let foundUser = result[0];
                    const user = { name: username }
                    const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
        
                    const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '2m' })
                    console.log(refresh_token)
                    mysql.query(`Update user set rToken='${refresh_token}' where user_name='${username}' `, (err, results, fields) => {
                        if (err) console.log(err)
        
                        res.cookie('jwt', refresh_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
                        res.json({ accessToken: access_token,
                            foundUser 
                        })
        
                    })
                }
                else{
                    res.sendStatus(403)
                }
          
            })
           
        }
    })

}

module.exports = handleLogin