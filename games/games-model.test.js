const db = require('../data/dbConfig')
const games = require('./games-model')

describe('games model', () => {

  describe('insert()', () => {

    beforeEach(async () => {
      await db('games').truncate()
    })

    test('should insert the provided game into the db', async () => {
      const testInput = {
        title: 'Tetris',
        genre: 'Arcade',
        releaseYear: 1980
      }
      const game = await games.insert(testInput)

      expect(game.title).toBe('Tetris')
      expect(game.genre).toBe('Arcade')
      expect(game.releaseYear).toBe(1980)
    })

  })

  describe('getAll()', () => {

    beforeEach(async () => {
      await db('games').truncate()
    })

    test('should get all games from the db', async () => {
      await db('games').insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1979 })

      const gamesList = await games.getAll()

      expect(gamesList.length).toEqual(1)
      expect(gamesList[0].title).toBe('Pacman')
      expect(gamesList[0].genre).toBe('Arcade')
      expect(gamesList[0].id).toBe(1)
    })

  })


})
