const bodyParser = require('body-parser')
const mysql = require('../connection')
const handlefriends = async (req, res) => {
    try {
        console.log(req.params.user)
        console.log("heloo")
        mysql.query(`Select * from friend where userID=${req.params.user}`,(err,data,field)=>{
            console.log(data);
            if(data.length){
                mysql.query(`Select * from friend,user WHERE friend.friendID = user.id and userID =  ${req.params.user}`, (err, results, field) => {
                    if (err) res.json({err})
                    else {
                        if (!results[0]) {
                            res.json({message:"No friends"})
                        }

                        res.json({friends:results})
                    }
                })
            }
            else{
                console.log("hii")
                res.json({message:'No friends'})
            }
        })
       

    } catch (error) {
        res.sendStatus(500)
    }
}
const getConversationId= async (req, res) => {
    try {
        mysql.query(`Select * from conversation_holder`, (err, results, field) => {
            if (err) console.log(err)
            else {
                res.json(results.length)
            }
        })

    } catch (error) {
        console.log('hihih')
        res.sendStatus(500)
    }
}
const addConversationID=async (req, res) => {
    try {
        console.log(req.body.conversationId)
        const conversationID= req.body.conversationId;
        mysql.query(`Insert into conversation_holder(conversationID) value(${conversationID})`, (err, results, field) => {
            if (err) res.json({err})
            else {
                res.json({message:"added"})
            }
        })

    } catch (error) {
        res.sendStatus(500)
    }
}
const addFriend=async (req, res) => {
    try {
        const userID=req.body.userId;
       const friendID= req.body.friendId;
        const conversationID=req.body.conversationID;
        mysql.query(`Select conversationID from friend where friendID=${userID} and userID=${friendID}`,(err,conversationId,fields)=>{
            console.log("LLLLLLLLLLLLL");
            console.log(conversationId)
            if(conversationId.length){
                mysql.query(`Insert into friend(userID,friendID,conversationID) values(${userID},${friendID},${conversationId[0].conversationID})`, (err, results, field) => {
                    if (err) res.json({err})
                    else {
                        res.json({message:"Friend Added"})
                    }
                })
            }
            else{
                mysql.query(`Insert into friend(userID,friendID,conversationID) values(${userID},${friendID},${conversationID})`, (err, results, field) => {
                    if (err) res.json({err})
                    else {
                        res.json({message:"Friend Added"})
                    }
                })
            }
            
    
        })
        
    } catch (error) {
        res.sendStatus(500)
    }
}
const checkFriend=async (req, res) => { 
    try {
    const userID=req.body.userId;
       const friendID= req.body.friendId;
       console.log("!!!!!!")
       console.log(userID+friendID)
        mysql.query(`Select * from friend where userID=${userID} and friendID=${friendID}`, (err, results, field) => {
            if (err) res.json({err})
            else {
                console.log("!!!!!!")
                res.json({exists:results.length})
            }
        })

    } catch (error) {
        console.log('hihih')
        res.sendStatus(500)
    }
}


const removeFriend=async (req, res) => {
    try {
       const friendID= req.body.friendId;
        mysql.query(`Delete from friend where friendID=${friendID}`, (err, results, field) => {
            if (err) res.json({err})
            else {
                res.json({message:"Friend Removed"})
            }
        })

    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = {handlefriends,getConversationId,addConversationID,addFriend,removeFriend,checkFriend}