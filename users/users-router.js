const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('./users-model.js');
const restricted = require('./restrictedMW');
const { jwtSecret } = require('../authConfig/secrets')
const jwt = require('jsonwebtoken')
const db = require("../data/dbConfig")


router.get('/users/:id', (req, res) => {

  const payload =  {
        id: 0,
        username: '',
        password: '',
        name: '',
        role: '',
        phone: '',
        numberOfChildren: '',
        location: '', 
        posts: []
    }

    db("users").where("id", req.params.id).first()
        .then(user => {
            payload.id = user.id
            payload.username = user.username
            payload.password = user.password
            payload.name = user.name
            payload.role = user.role
            payload.phone = user.phone
            payload.numberOfChildren = user.numberOfChildren
            payload.location = user.location
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "can't get user" })
        })

    db("posts")
        .join("users", "posts.user_id", "users.id")
        .where("posts.user_id", req.params.id)
        .select("posts.id", "posts.title", "posts.contents", "users.name as postedBy")
        .then(post => {
            payload.posts = post
            res.status(200).json(payload)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "can't get post "})
        })

});

router.post('/auth/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash

    Users.add(user)
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/auth/login', (req, res) => {
    let { username, password } = req.body
    Users.findBy({ username })
        .first()
        .then(user => {
            console.log('1')
            if (user && bcrypt.compareSync(password, user.password)) {
                console.log('2')
                console.log(user)
                const token = signToken(user);

                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Username or Password invalid' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


function signToken(user) {
    console.log('3')
    const payload = {
        username: user.username,
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;