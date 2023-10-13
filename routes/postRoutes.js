import express from 'express'

const router = express.Router()

import {
  getPosts,
  singlePost,
  createPost,
  //   updatePost,
  likePost,
  deletePost,
} from '../controllers/postController.js'

router.get('/', getPosts)
router.post('/create', createPost)
router.get('/:id', singlePost)
// router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:id', likePost)

export default router
