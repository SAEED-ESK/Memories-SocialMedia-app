const PostMessage = require("../models/postMessage");
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
  const posts = await PostMessage.find();
  res.json(posts);
};

const createPosts = async (req, res) => {
  const post = new PostMessage(req.body);
  await post.save();
  res.json(post);
};

const updatePosts = async (req, res) => {
  const _id = req.params.id;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("Invalid post id!");
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatedPost);
};

const likePosts = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("Invalid post id!");
  const post = await PostMessage.findById(_id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { likeCount: post.likeCount + 1 },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

const deletePosts = async (req, res) => {
  const _id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("Invalid post id!");
  const updatedPost = await PostMessage.findByIdAndRemove(_id);
  res.json("Post has been deleted");
};

module.exports = {
  getPosts,
  createPosts,
  updatePosts,
  likePosts,
  deletePosts,
};
