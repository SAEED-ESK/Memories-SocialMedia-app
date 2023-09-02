const express = require("express");
const {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
  likePosts,
} = require("../controllers/posts");

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPosts);
router.put("/:id", updatePosts);
router.delete("/:id", deletePosts);
router.patch("/:id/likePost", likePosts);

module.exports = router;
