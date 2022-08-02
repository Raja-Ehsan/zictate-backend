const mysql = require('../connection')
const sendMessage = async (req, res) => {
    try {
        const conversationID = req.body.conversationID;
        const senderID= req.body.senderID;
        const text= req.body.text;
        mysql.query(`Insert into conversations(conversationID,senderID,text) values(${conversationID},${senderID},'${text}')`, (err, results, field) => {
            if (err) res.json({err})
            else {
                if(results.affectedRows>0)
                {
                    res.json({message:"sent"})
                }
                else{
                    res.json({message:"error"})
                }
            }
        })

    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = sendMessage