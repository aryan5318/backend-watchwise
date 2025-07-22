const express = require('express');
require('dotenv').config();


const router = express.Router();

const User = require('../models/userModel');
router.use(express.json());

router.post('/like', async (req, res) => {
 const { email, movieId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email },

      {
       
        $addToSet: { likedMovies: movieId }
      },
      { upsert: true, new: true }
    
    );
     
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/deleteliked', async (req, res) => {
  const email = req.body.email
  const movieId = req.body.movieId
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { likedMovies: movieId } },
      { new: true }
    )
  }
  catch (error) {

  }
})

router.get('/isLiked', async (req, res) => {
  const { email, movieId } = req.query;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ isLiked: false, message: 'User not found' });
    }

    const isLiked = user.likedMovies.includes(movieId);
    res.json({ isLiked });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ isLiked: false, error: error.message });
  }
});


router.post('/history', async (req, res) => {
  const { email, movieId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        $addToSet: {
          watchHistory: { movieId } // correct field to push into
        }
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "History updated",
      watchHistory: user.watchHistory
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.get('/watchhistory', async (req, res) => {

  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not find" })
    }
    else res.json(user.watchHistory)
    
  }
  catch (error) {
    console.log("watchhistory error:" + error);
  }

})
router.get('/gemini',async(req,res)=>{
  const {email}=req.query
  try{    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not find" })
    }
    else res.json(user)

  }
  catch(error){

  }
})
module.exports = router; 
