const request = require('supertest');
const server = require('./server.js');
const db = require('../database/dbConfig.js');
const testUser = {username: 'testname', password: 'password'}

describe('server.js', () => {
    
    describe('GET /api/jokes', () => {
        it('should return a status code of 400 when not authed', async () => {
            const res = await request(server).get('/api/jokes')
            expect(res.status).toBe(500);
        })

        it('should return json', async () => {
            const res = await request(server).get('/api/jokes')
            expect(res.type).toBe('application/json')
        })
    })

    describe('POST /api/auth/register', () => {

        it('should return a status code of 201 when creating a new user', async () => {
            await db('users').truncate();

            const res = await request(server)
                .post('/api/auth/register')
                .send(testUser);
                expect(res.status).toBe(201)
        });

        it('should return a status code of 500 for invalid users', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({uzername: 'test', pw: 'password'});
                expect(res.status).toBe(500);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should return status 200 when logging in', async () => {
            const res = await request(server)
            .post('/api/auth/login')
            .send(testUser);
            expect(res.status).toBe(200)
        })

        it('should return status 401 for invalid users', async () => {
            const res = await request(server)
            .post('/api/auth/login')
            .send({username: 'fake', password:'gone410'});
            expect(res.status).toBe(404)
        })
    })
});