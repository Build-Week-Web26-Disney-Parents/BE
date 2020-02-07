const db = require("../data/dbConfig")
const { jwtSecret } = require('../authConfig/secrets')
const jwt = require('jsonwebtoken')
const router = require('express').Router();
const restrictedMW = require('../users/restrictedMW')


router.get('/', restrictedMW, (req, res) => {

    db('posts').orderBy('created_at')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'failed' })
        })

})

router.get('/:id', restrictedMW, (req, res) => {
    let payload = {
        id: 0,
        title: '',
        content: '',
        postedBy: '',
        comments: []
    }

    db('posts')
        .join('users', 'users.id', 'posts.user_id')
        .where('posts.id', req.params.id)
        .select('posts.id', 'posts.title', 'posts.contents', "users.username")
        .first()
        .then(post => {
            console.log(post)
            payload = {
                ...payload,
                id: post.id,
                title: post.title,
                content: post.contents,
                postedBy: post.username

            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'fail' })
        })

    db('comments')
        .join('posts', 'posts.id', "post_id")
        .join('users', 'users.id', "comments.user_id")
        .where('comments.post_id', req.params.id)
        .select('comments.id', 'comments.contents', "users.username")
        .then(commentarr => {
            payload = {
                ...payload,
                comments: commentarr
            }


        })
        .then(() => {
            res.status(200).json(payload)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'fail' })
        })
})

router.post('/', restrictedMW, (req, res) => {
    console.log("req.boyd", req.body)
    payload = {
        ...req.body,
        user_id: req.user.id
    }
    console.log("pay", payload)
    db('posts').insert(payload, "id")
    .then(post => {
        res.status(201).json(post[0])
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'fail'})
    })
})

router.post('/:id/comments', restrictedMW, (req, res) => {
    const payload = {
        ...req.body,
        user_id: req.user.id,
        post_id: parseInt(req.params.id)
    }
    console.log("payload",payload)
    db('comments').insert(payload, "id")
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            console.log(payload)
            console.log(err)
            res.status(500).json({ message: 'fail' })
        })
})

router.put('/:id', restrictedMW, (req, res) => {

    db('posts').update(req.body).where('id', req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'fail' })
        })
})

router.put('/:id/comments', restrictedMW, (req, res) => {

    db('comments').update(req.body).where('id', req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'fail' })
        })
})

router.delete("/:id", restrictedMW, (req, res) => {
    db('posts').where('id', req.params.id).del()
        .then(deleted => res.status(200).json(deleted))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "can't delete user" })
        })
})

router.delete("/:id/comments", restrictedMW, (req, res) => {
    db("comments").where("id", req.params.id).del()
        .then(deleted => res.status(200).json(deleted))
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "can't delete user" })
        })
})

module.exports = router;