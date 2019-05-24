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

})
