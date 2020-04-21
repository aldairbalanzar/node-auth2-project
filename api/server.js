const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./usersRouter');
const authRouter = require('./auth/authRouter');
const authenticator = require('./auth/authenticator');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'hey!'})
});

server.use('/api/users', authenticator, usersRouter);
server.use('/api/auth', authRouter);

module.exports = server;