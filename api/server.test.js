const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig')

describe('server.js', () => {

  test('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('endpoints', () => {
    describe('GET /', () => {

      test('should return 200 OK using async/await', async () => {
        const res = await request(server).get('/')
        expect(res.status).toBe(200)
      })

      test('should return JSON', async () => {
        const res = await request(server).get('/')
        expect(res.type).toBe('application/json')
      })

      test('should return "api: running"', async () => {
        const res = await request(server).get('/')
        expect(res.body).toEqual({ api: 'running' })
      })

    })

    describe('games endpoints', () => {

      beforeEach(() => {
        return db('games').truncate()
      })

      test('should return empty array if no games', async () => {
        const res = await request(server).get('/games')
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body).toEqual([])
      })

      test('should return array of games and status 200', async () => {
        await db('games').insert({ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 })
        await db('games').insert({ title: 'Tetris', genre: 'Arcade', releaseYear: 1981 })

        const res = await request(server).get('/games')
        const data = res.body

        expect(res.status).toBe(200)
        expect(data.length).toEqual(2)
        expect(data[0].id).toBe(1)
        expect(data[0].title).toBe('Pacman')
        expect(data[1].id).toBe(2)
        expect(data[1].title).toBe('Tetris')
      })

      test('should return status code 422 if required info missing', async () => {
        const testInput = { title: 'Pacman', releaseYear: 1980 }
        const res = await request(server).post('/games').send(testInput)
        expect(res.status).toBe(422)
      })

    })

  })
})
