const PostMessage = require('../models/postMessage')

const getPosts = async (req, res) => {
    const posts = await PostMessage.find()
    res.json(posts)
}

const createPosts = async (req, res) => {
    const body = req.body
    const post = new PostMessage(body)
    await post.save()
    res.json(post)
}

module.exports = {
    getPosts,
    createPosts
}