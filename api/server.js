const express = require('express');

const games = require('../games/games-model')

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'running' })
})

server.get('/games', async (req, res) => {
  const gamesList = await games.getAll();
  res.status(200).json(gamesList)
})

server.post('/games', async (req, res) => {
  if (!req.body.title || !req.body.genre) {
    res.status(422).json({
      message: "Incomplete information. Please resubmit."
    })
  } else {
    const gamesList = await games.getAll()
    res.status(200).json(gamesList)
  }
})

module.exports = server;