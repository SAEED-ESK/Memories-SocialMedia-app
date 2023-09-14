const PostMessage = require("../models/postMessage");
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
  const posts = await PostMessage.find();
  res.json(posts);
};

const createPosts = async (req, res) => {
  const data = req.body;
  console.log(req.userId);
  const post = new PostMessage({ ...data, creator: req.userId });
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

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json("Invalid post id!");
  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((_id) => _id === String(req.userId));
  if (!index) {
    // like the post
    post.likes.push(_id);
  } else {
    // dislike the post
    // post.likes.splice(index, 1);
    post.like = post.likes.filter((id) => id !== String(req.userId));
  }

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
