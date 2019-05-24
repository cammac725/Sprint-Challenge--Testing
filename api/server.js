const express = require('express');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'running' })
})

server.get('/games', async (req, res) => {
  const gamesList = await Games.getAll();
  res.status(200).json(gamesList)
})

module.exports = server;