const mysql = require('../connection');
const bcrypt = require('bcryptjs');

const handleNewUser = async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;
    const city = req.body.city;
    const province = req.body.province;
    const relationship = req.body.relationship;
    if (!user || !email || !city || !province || !relationship || !password) return res.sendStatus(403);
    else {
        try {
            console.log(user)
            const hashedPassword = await bcrypt.hash(password, 10)
            mysql.query(`Select * from user where user_name='${user}'`, (err, results, fields) => {
                if (results.length) { console.log('luluul'); res.json({ exists: true })}
                else {
                    mysql.query(`Insert into user (user_name,password,email,role,city,relationship,province,profileImage,coverImage) values ('${user}','${hashedPassword}','${email}','user','${city}','${relationship}','${province}','Profile_alt.png','Cover_alt.png')`, (error, results, fields) => {
                        if (error) console.log(error)
                        res.json({ done: true })
                    })
                }
            })

        } catch (err) {
            console.log(`DB error error: ${err}`)
        }
    }
}

module.exports = handleNewUser;