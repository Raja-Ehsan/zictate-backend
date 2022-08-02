const mysql = require('../connection')
const getComments = async (req, res) => {
    try {
        console.log(req.body.postId);
        const postId = req.body.postId;
        mysql.query(`Select * from comments,user where comments.userId=user.id and comments.postId=${postId}`, (err, results, field) => {
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
const addComment=async(req,res)=>{
    try{
        const postId=req.body.postId;
        const userId=req.body.userId;
        const text=req.body.text;
        mysql.query(`Insert into comments(postID,userId,text) values(${postId},${userId},"${text}")`, (err, results, field) => {
            if (err) res.json({ err })
            else if(results) {
                res.json({message:"posted"})
            }
        })

    }
    catch(err){
        res.sendStatus(500)
    }
}

module.exports = {getComments,addComment}