const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")




router.get('/allpost',requireLogin, (req, res) => {
    Post.find()

    .populate("postedBy", "_id name")
        // .populate("comments.postedBy","_id name")
        // .sort('-createdAt')
        .then((posts) => {
            res.json({ posts })
        }).catch(err => {
            console.log(err)
        })

})

router.post('/createpost', requireLogin, (req, res) => {
    const { name,designation,reminder,date,day } = req.body
    if (!name || !designation || !reminder) {
        return res.status(422).json({ error: "Plase add all the fields" })
    }
    // console.log(req.user)
    // res.send("ok    ")
    req.user.password = undefined;
    const post = new Post({
        name,
        designation,
        reminder,
        postedBy: req.user,
        date,
        day

    })
    post.save().then(result => {
            res.json({ post: result })
        })
        .catch(err => {
            console.log(err)
        })
})
module.exports = router