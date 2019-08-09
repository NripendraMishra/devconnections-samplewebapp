const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const validatePostInput = require('../../validator/post')

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) => {
    res.status(200)
        .json({
            msg: 'Posts works'
        })
})

// @route   GET api/posts/:id
// @desc    Get posts 
// @access  Public
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    Post.findById(req.params.id)
        .then(post => res.status(200).json(post))
        .catch(err => res.status(404).json({
            message: 'No Posts found'
        }))
})

// @route   GET api/posts
// @desc    Get posts 
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({
            date: -1
        })
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(404).json({
            message: 'No Post found with this id'
        }))
})

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Profile.findOne({
            user: req.user.id
        }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    console.log(post.user.toString())
                    if (post.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({
                                notauthorized: 'User not authorized'
                            })
                    }

                    // Delete
                    post.remove().then(() => res.json({
                        success: true
                    })).catch(err => console.log(err))
                })
                .catch(err => res.status(404).json({
                    postnotfound: 'No post found'
                }))
        })
    }
)

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id)
          .then(post => {
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
                .length > 0
            ) {
              return res
                .status(400)
                .json({ alreadyliked: 'User already liked this post' })
            }
  
            // Add user id to likes array
            post.likes.unshift({ user: req.user.id })
  
            post.save().then(post => res.json(post))
          })
          .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
      });
    }
  );   


// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' })
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1)
          // Save
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    })
  }
)

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body)
  
      // Check Validation
      if (!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors)
      }
  
      Post.findById(req.params.id)
        .then(post => {
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
          };
  
          // Add to comments array
          post.comments.unshift(newComment)
  
          // Save
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }))
    }
  );
  

// @route   DELETE api/posts/comment/:id
// @desc    Delete comment on a post
// @access  Private
router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Profile.findOne({
            user: req.user.id
        }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                        // Check if comment exitsts
                        console.log(comment)
                        res.status(400).json({
                                already: 'This comment not on this post'
                            })
                            .catch(err => console.log(err))
                    }

                     // Get remove
                     const removeIndex = post.comments.map(item => item.user.toString()).indexOf(req.params.comment_id)
                     post.comments.splice(removeIndex, 1)
 
                     // Save
                     post.save().then(post => res.status(200).json(post)).catch(err => console.log(err))
                })
                .catch(err => res.status(404).json({
                    postnotfound: err
                }))
        })
    }
)


// @route   POST api/posts
// @desc    Create post 
// @access  Public
router.post('/', passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    const {
        errors,
        isValid
    } = validatePostInput(req.body)

    // Check Validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        user: req.user.id,
        name: req.body.name,
        avatar: req.body.avatar
    })

    newPost.save().then(post => res.status(200).json(post)).catch(err => console.log(err))

})



module.exports = router