const db = require('../data/dbConfig')

module.exports = {
    add,
    find,
    findBy,
    findById,
    findPosts
}

function find() {
    return db('users');
}

function findBy(filter) {
    return db('users').where(filter);
}

async function add(user) {
    const [id] = await db('users').insert(user);
    return findById(id);
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function findPosts(id){
    return db("posts")
    .join("users", "posts.user_id", "users.id")
    .where("posts.user_id", id)
    .select("posts.id", "posts.title", "posts.contents", "users.name as postedBy")
}