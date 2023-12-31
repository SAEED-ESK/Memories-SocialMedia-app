const PostMessage = require("../models/postMessage");
const mongoose = require("mongoose");

const getPosts = async (req, res) => {
  const { page } = req.query;

  const LIMIT = 1;
  const startIndex = (Number(page) - 1) * LIMIT;
  const total = await PostMessage.countDocuments({});

  const posts = await PostMessage.find()
    .sort({ _id: -1 })
    .limit(LIMIT)
    .skip(startIndex);
  res.json({
    data: posts,
    currentPage: Number(page),
    numberOfPage: Math.ceil(total / LIMIT),
  });
};

const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await PostMessage.findById(id);
  res.json({ data: post });
};

const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  const title = new RegExp(searchQuery, "i");

  const posts = await PostMessage.find({
    $or: [{ title }, { tags: { $in: tags?.split(",") } }],
  });
  res.json({ data: posts });
};

const createPosts = async (req, res) => {
  const data = req.body;
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

const commentPost = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);
  post.comments.push(value);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
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
  getPost,
  getPostsBySearch,
  createPosts,
  updatePosts,
  likePosts,
  commentPost,
  deletePosts,
};
