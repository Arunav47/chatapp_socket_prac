const dotenv = require('dotenv');
const http = require('http');
const path = require('path');
const express = require('express');
const connectDB  = require('./config/mongo_db_connect');
const userRoutes = require('./routes/user.routes');
const chatRoutes = require('./routes/chat.routes');
const cookieParser = require('cookie-parser'); // Add this line
const { Server } = require('socket.io');
const userModels = require('./models/userModel');

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
connectDB(process.env.MONGO_URL);

// Use cookie-parser middleware
app.use(cookieParser()); // Add this line

// Create HTTP server
const server = http.createServer(app);

const io = new Server(server);
// app.get('/', (req, res) => {
//     res.render('navbar');
// });
// Set up the routes
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);

// const clients = {};

let user_namespace = io.of('/user');

user_namespace.on('connection', async function(socket) {
    console.log('User connected');
    // console.log(socket.handshake.auth.token);
    await userModels.findOneAndUpdate({username : socket.handshake.auth.token}, {status : true});
    let user = await userModels.findOne({username : socket.handshake.auth.token});
    console.log(user);
    socket.on('disconnect', async () =>{
        console.log('User disconnected');
        await userModels.findOneAndUpdate({username : socket.handshake.auth.token}, {status : false});
        user = await userModels.findOne({username : socket.handshake.auth.token});

        console.log(user);
    })
})

// io.on('connection',  (socket) => {
//     socket.on('private')
// })

// Start the server
server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});