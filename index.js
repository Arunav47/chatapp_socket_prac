const dotenv = require('dotenv');
const http = require('http');
const express = require('express');
const connectDB  = require('./config/mongo_db_connect');
const userRoutes = require('./routes/user.routes');


dotenv.config();
const app = express();

app.set('view engine', 'ejs');

// Connect to MongoDB
connectDB(process.env.MONGO_URL);

// Create HTTP server
const server = http.createServer(app);

// Set up the routes
app.use('/user', userRoutes);


// Start the server
server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});