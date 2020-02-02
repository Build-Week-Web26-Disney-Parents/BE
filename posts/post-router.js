const db = require("../data/dbConfig")
const { jwtSecret } = require('../authConfig/secrets')
const jwt = require('jsonwebtoken')
const router = require('express').Router();

router.get('/', (req, res) => {

    db('posts').orderBy('created_at')
    .then(posts => {
        res.status(201).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'failed'})  
    })

})

router.get('/:id', (req, res) => {
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
        res.status(500).json({message: 'fail'})
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
    .then(()=>{
        res.status(200).json(payload)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'fail'})
    })
})

module.exports = router;