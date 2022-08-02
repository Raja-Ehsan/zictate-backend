require('dotenv').config()
const express = require('express')
const cors=require('cors')
const mysql = require('./connection')
const path=require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const handleLogin = require('./controllers/loginController')
const hadleRefeshToken = require('./controllers/refreshTokenController')
const verifyJWT = require('./middleware/verifyJWT')
const handleNewUser = require('./controllers/registerController')
const { handlefriends } = require('./controllers/friendsController')
const { getConversationId } = require('./controllers/friendsController')
const { addConversationID } = require('./controllers/friendsController')
const { addFriend } = require('./controllers/friendsController')
const getMessages = require('./controllers/getMessagesController')
const sendMessage = require('./controllers/sendMessageController')
const { getAllPosts } = require('./controllers/postsController')
const { getPostsById } = require('./controllers/postsController')
const getLikes = require('./controllers/likesController')
const {getProfile, editProfile, getAllUsers, addProfile, addCover} = require('./controllers/profileController')
const {getUsers} = require('./controllers/profileController')
const { getComments } = require('./controllers/commentController')
const { addComment } = require('./controllers/commentController')
const { checkFriend } = require('./controllers/friendsController')
const { removeFriend } = require('./controllers/friendsController')
const { addPost } = require('./controllers/postsController')
const { uploadImage } = require('./controllers/postsController')
const handleLogout=require('./controllers/logoutController')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload=multer({storage});

var app = express();

app.use('/images',express.static(path.join(__dirname,'public/images')))

app.use(cookieParser())

app.use(cors({
    origin: "https://62e9697c24c22344a52eecf1--deluxe-sable-a44c90.netlify.app"
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.post('/signup', handleNewUser);

app.post('/login', handleLogin);

app.get('/refresh', hadleRefeshToken);

app.post('/:user/conversation/send', sendMessage)

app.get('/:user/conversations', handlefriends);

app.get('/conversations/:conversationID', getMessages);

app.get('/posts', getAllPosts);

app.post('/getlikes', getLikes);

app.post('/addComment', addComment);

app.post('/getcomments', getComments);

app.get('/getUsers/:id', getUsers);

app.get('/Profilee/:id', getProfile);

app.get('/getConversationId', getConversationId);

app.get('/getAllUsers', getAllUsers);

app.post('/checkFriend', checkFriend);

app.post('/addProfilePhoto', addProfile);

app.post('/addCoverPhoto', addCover);

app.post('/removeFriend', removeFriend);

app.post('/addConversationId', addConversationID);

app.post('/updateProfile/:id', editProfile);

app.post('/addPost', addPost);

app.post('/uploadImage',upload.single('file'), uploadImage);

app.post('/addFriend', addFriend);

app.get('/posts/:id', getPostsById);

app.get('/post', verifyJWT, (req, res) => {
    try{
        res.sendStatus(200)
    }
    catch(err){
        console.log(err)
    }
})

app.post('/logout', async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.end();
        console.log("logout Successfully")
    } catch (error) {
        res.sendStatus(500)
    }
});


app.listen( process.env.PORT||3001, () => {
    console.log("Server started on port 3001")
})
