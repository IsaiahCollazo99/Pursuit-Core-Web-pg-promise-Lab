var express = require('express');
var router = express.Router();
const {db} = require("./../db");

router.get('/all', async (req, res) => {
  res.json({
    posts: await db.any("SELECT * FROM posts"),
    message: "All posts successfully retrieved",
    timestamp: new Date().toString()
  })
});

router.get('/:user_id', async (req, res) => {
  let {user_id} = req.params;
  let userPosts = await db.any("SELECT * FROM posts WHERE poster_id=$1", user_id);
  
  if(userPosts.length) {
    res.json({
      userPosts,
      message: "All posts successfully retrieved",
      timestamp: new Date().toString()
    })
  } else {
    res.json({
      error: "No posts found by that user",
      timestamp: new Date().toString()
    })
  }
});

router.post('/register', (req, res) => {
  res.send('Creating new post!');
});

module.exports = router;
