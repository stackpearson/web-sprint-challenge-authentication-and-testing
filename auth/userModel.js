const db = require('../database/dbConfig.js');

function find() {
    return db('users').select('id', 'username').orderBy('id')
}

async function add(user) {
    try {
        const [id] = await db('users').insert(user, 'id');
        return findById(id);
    } catch (err) {
        throw err;
    }
}

function findById(id) {
    return db('users').where({ id }).first();
}

module.exports = {
    find,
    add,
    findById
}