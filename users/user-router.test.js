const request = require('supertest')
const server = require('../api/server')
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../authConfig/secrets')
const db = require("../data/dbConfig")


describe('test register', function () {
    beforeEach(async () => {
        await db("comments").truncate()
        await db("posts").truncate()
        await db("users").truncate()
    })
    it('works', function () {
        return request(server).post('/api/users/register')
            .send({
                "username": "tonyt",
                "password": "pass",
                "email": "asfagag",
                "name": "aglfkhag",
                "role": "akljags",
                "phone": "asfjkh",
                "numberOfChildren": 2,
                "location": "agukag"
            })
            .then(res => {
                expect(res.status).toBe(201);

            })
    })
})

let token = ''
let decoded = {}
describe('test login', function () {

    it('works', function () {
        return request(server).post('/api/users/login')
            .send({
                username: 'tonyt',
                password: 'pass'
            })
            .then(res => {
                token = JSON.parse(res.text).token
                expect(res.status).toBe(200)

            })
    })
    it('works', function () {
        let isValid = false
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (!err) {
                isValid = true
                decoded = decodedToken
            }
        })
        expect(isValid).toBe(true)
    })
})


describe('test get to /user', function () {
    it('works', function () {
        return request(server).get('/api/users')
            .set('authorization', token)
            .then(res => {


                expect(res.status).toBe(200)

            })
    })
})

describe("get to /user/:id", () => {
    it("works", () => {
        return request(server).get("/api/users/1")
            .set("authorization", token)
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
})

describe(" /api/posts", () => {
    it("posts", () => {
        return request(server).post("/api/posts")
            .set("authorization", token)
            .send({
                title: "aklgha",
                contents: 'akljfhad'
            })
            .then(res => {
                expect(res.status).toBe(201)
            })
    })
    it("gets", () => {
        return request(server).get("/api/posts")
            .set("authorization", token)
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
    it("puts", () => {
        return request(server).put("/api/posts/1")
            .set("authorization", token)
            .send({
                title: "aklghaaaaaa",
                contents: 'akljfhad'
            })
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
})

describe(" /api/comments", () => {
    it("posts", () => {
        return request(server).post("/api/posts/1/comments")
            .set("authorization", token)
            .send({
                contents: 'akljfhadasda'
            })
            .then(res => {
                expect(res.status).toBe(201)
            })
    })
    it("puts", () => {
        return request(server).put("/api/posts/1/comments")
            .set("authorization", token)
            .send({
                contents: 'akljfhad'
            })
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
})

describe(" can delete to all endpoints", () => {
    it("can delete comment", () => {
        return request(server).delete("/api/posts/1/comments")
            .set("authorization", token)
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
    it("can delete post", () => {
        return request(server).delete("/api/posts/1")
            .set("authorization", token)
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
    it("can delete user", () => {
        return request(server).delete("/api/users")
            .set("authorization", token)
            .then(res => {
                expect(res.status).toBe(200)
            })
    })
})
