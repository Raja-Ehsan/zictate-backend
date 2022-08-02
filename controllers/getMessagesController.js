const mysql = require('../connection')
const getMessages = async (req, res) => {
    try {
        const conversationID = req.params.conversationID;
        mysql.query(`Select * from conversations,user where conversations.senderID=user.id and conversationID=${conversationID}`, (err, results, field) => {
            if (err) res.json({err})
            else {
                if(!results[0])
                {
                    res.json({mesage:"Error"})
                }
                else{
                    res.json({results})
                }
            }
        })

    } catch (error) {
        res.sendStatus(500)
    }
}

module.exports = getMessages