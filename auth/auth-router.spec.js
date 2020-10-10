const router = require('./auth-router.js');
const request = require('supertest');

describe('auth-router.js', () => {

    it('should run in a testing env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })

    describe('register', () => {

        it('should return 201 after registering a user', async () => {
            let user = {
                username: 'test-user1',
                password: 'password'
            }
            const res = await request(router).post('/register').send(user)
            console.log(user)
            expect(res.status).toBe(201);
        });

    })

    describe('login', () => {

        it('should return 201 after registering a user', async () => {
            let user = {
                username: 'test2',
                password: 'password'
            }
            const res = await request(router).post('/login').send(user)
            console.log(user)
            expect(res.status).toBe(201);
        });

    })

    

})