const mysql = require('../connection')
const bcrypt = require('bcryptjs');
const getProfile = async (req, res) => {
    try {

        const userId = req.params.id;
        mysql.query(`Select * from user where id=${userId}`, (err, results, field) => {
            if (err) res.json({ err })
            else {
                if (!results[0]) {
                    res.json({ mesage: "Error" })
                }
                else {
                    console.log(results[0])
                    res.json(results[0])
                }
            }
        })

    } catch (error) {
        console.log('hihih')
        res.sendStatus(500)
    }
}

const getUsers = async (req, res) => {
    try {
        console.log("HEllo")
        const userId = req.params.id;
        mysql.query(`Select * from user where id!=${userId} `, (err, results, field) => {
            if (err) res.json({ err })
            else {
                if (!results[0]) {
                    res.json({ mesage: "Error" })
                }
                else {
                    console.log(results)
                    res.json([results[0], results[1]])
                }
            }
        })

    } catch (error) {
        console.log('hihih')
        res.sendStatus(500)
    }
}
const getAllUsers = async (req, res) => {
    try {
        mysql.query(`Select * from user  `, (err, results, field) => {
            if (err) res.json({ err })
            else {
                if (!results[0]) {
                    res.json({ mesage: "Error" })
                }
                else {
                    console.log(results)
                    res.json(results)
                }
            }
        })

    } catch (error) {
        console.log('hihih')
        res.sendStatus(500)
    }
}

const editProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user_name = req.body.user_name;
        const email = req.body.email;
        const city = req.body.city;
        const province = req.body.province;
        const relationship = req.body.relationship;
        const password = await bcrypt.hash(req.body.password_, 10)
        console.log(req.body.password_)
        if (!user_name || !email || !city || !province || !relationship || !req.body.password_) {
            res.sendStatus(403);
        }
        else {
            mysql.query(`Select * from user where user_name='${user_name}'`, (err, results, fields) => {
                if (results.length) res.json({ exists: true })
                else {
                    mysql.query(`Update user SET user_name ='${user_name}', email= '${email}', password = '${password}', city='${city}',province='${province}',relationship='${relationship}' where id=${userId} `, (err, results, field) => {
                        if (err) console.log(err)
                        else {
                            res.json({ message: 'Updated' })
                        }
                    })
                }
            })
        }


    } catch (error) {
        console.log(error)
    }
}
const addCover = async (req, res) => {
    try {
        const userId = req.body.id;
        const cover = req.body.img;

        mysql.query(`Update user SET coverImage ='${cover}' where id=${userId} `, (err, results, field) => {
            if (err) console.log(err)
            else {
                res.json({ message: 'Updated' })
            }
        })


    } catch (error) {
        console.log(error)
    }
}
const addProfile = async (req, res) => {
    try {
        const userId = req.body.id;
        const profile = req.body.img;

        mysql.query(`Update user SET profileImage ='${profile}' where id=${userId} `, (err, results, field) => {
            if (err) console.log(err)
            else {
                res.json({ message: 'Updated' })
            }
        })


    } catch (error) {
        console.log(error)
    }
}
module.exports = { getProfile, getUsers, editProfile, getAllUsers,addCover,addProfile };