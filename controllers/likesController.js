const mysql = require('../connection')
const getLikes =async (req, res) => {
    try {
        const postId = req.body.postId;
        mysql.query(`Select * from likes,user where likes.userId=user.id and likes.postId=${postId}`, (err, results, field) => {
            if (err) res.json({ err })
            else {
                console.log(results)
                res.json({ results })
            }
        })

    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = getLikes