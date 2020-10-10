const router = require('./jokes-router.js');
const request = require('supertest');

describe('jokes-router.js', () => {

    it('should be running in a test env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })

    // describe('GET /', () => {

    //     it('should return 200', async () => {
    //         const res = await request(router).get('/')
    //         expect(res.status).toBe(200)
    //     })

    // })

})