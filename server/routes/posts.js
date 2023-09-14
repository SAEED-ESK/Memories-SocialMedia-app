const express = require("express");
const {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
  likePosts,
} = require("../controllers/posts");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPosts);
router.put("/:id", auth, updatePosts);
router.delete("/:id", auth, deletePosts);
router.patch("/:id/likePost", auth, likePosts);

module.exports = router;
