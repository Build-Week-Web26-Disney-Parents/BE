const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('./users-model.js');
const restricted = require('./restrictedMW');
const { jwtSecret } = require('../authConfig/secrets')
const jwt = require('jsonwebtoken')
const db = require("../data/dbConfig")


router.get("/", restricted,(req,res) => {
    Users.findById(req.user.id)
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "can't find user profile" })
        })
})

router.get('/:id', (req, res) => {

  const payload =  {
        id: 0,
        username: '',
        password: '',
        email: "",
        name: '',
        role: '',
        phone: '',
        numberOfChildren: '',
        location: '', 
        posts: []
    }

    Users.findById(req.params.id)
        .then(user => {
            payload.id = user.id
            payload.username = user.username
            payload.password = user.password
            payload.name = user.name
            payload.role = user.role
            payload.phone = user.phone
            payload.numberOfChildren = user.numberOfChildren
            payload.location = user.location
            payload.email = user.email
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "can't get user" })
        })

        Users.findPosts(req.params.id)
        .then(post => {
            payload.posts = post
            res.status(200).json(payload)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "can't get post "})
        })

});

router.post('/register', (req, res) => {
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

router.post('/login', (req, res) => {
    let { username, password } = req.body
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
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
    const payload = {
        id: user.id,
        username: user.username,
    };
    const options = {
        expiresIn: '1d'
    };
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;