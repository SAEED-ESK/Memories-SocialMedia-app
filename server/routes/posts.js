const express = require("express");
const {
  getPosts,
  getPost,
  getPostsBySearch,
  createPosts,
  updatePosts,
  deletePosts,
  likePosts,
  commentPost,
} = require("../controllers/posts");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPosts);
router.put("/:id", auth, updatePosts);
router.delete("/:id", auth, deletePosts);
router.patch("/:id/likePost", auth, likePosts);
router.post("/:id/comments", auth, commentPost);

module.exports = router;
