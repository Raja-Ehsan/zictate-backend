const mysql = require('../connection')


const getAllPosts = async (req, res) => {
    try {
        mysql.query(`Select * from posts,user where user.id=posts.userId order by postId DESC `, (err, results, field) => {
            if (err) res.json({ err })
            else {
                if (!results[0]) {
                    res.json({ mesage: "Error" })
                }
                else {
                    res.json({ results })
                }
            }
        })

    } catch (error) {
        res.sendStatus(500)
    }
}

const getPostsById = async (req, res) => {
    try {
        mysql.query(`Select * from posts,user where user.id=posts.userId and user.id=${req.params.id} `, (err, results, field) => {
            if (err) res.json({ err })
            else {
                if (!results[0]) {
                    res.json({ mesage: "Error" })
                }
                else {
                    res.json({ results })
                }
            }
        })

    } catch (error) {
        res.sendStatus(500)
    }
}

const uploadImage=async (req, res) => {
   {
    try{console.log("uploaded")}catch(err){console.log(err)}
   }
}

const addPost = async (req, res) => {
    try {
        const description = req.body.description;
        const img = req.body.img;
        const userId = req.body.userId;
        mysql.query(`Insert into posts(description,img,userId) values ('${description}','${img}',${userId}) `, (err, results, field) => {
            if (err) res.json({ err })
            else {
                res.json({message:"Post Added"})
            }
        })

    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = { getAllPosts, getPostsById ,addPost,uploadImage}