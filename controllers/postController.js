import Post from '../models/Post.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

export const createPost = async (req, res) => {
  const { title, message, tags, creator, selectedFile } = req.body
  console.log(creator)
  if (!title || !message || !tags || !selectedFile) {
    throw new BadRequestError('Provide all values.')
  }
  if (!creator) {
    throw new UnAuthenticatedError('Login to create post')
  }

  const post = await Post.create({
    title,
    message,
    tags,
    creator,
    selectedFile,
  })
  res.status(StatusCodes.CREATED).json({
    msg: 'Post created successfully...',
  })
}

export const getPosts = async (req, res) => {
  const data = await Post.find({})
  res.status(StatusCodes.OK).json(data)
}

export const singlePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id })
  res.status(StatusCodes.OK).json({ post })
}

export const deletePost = async (req, res) => {
  await Post.deleteOne({ _id: req.params.id })
  res.status(StatusCodes.OK).json({ msg: 'Post deleted successfully....' })
}

export const likePost = async (req, res) => {
  const likedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { $inc: { likeCount: 1 } },
    { new: true }
  )

  res.status(StatusCodes.OK).json({ likedPost })
}

export const updatePost = async (req, res) => {
  const { title, message, tags, creator, selectedFile } = req.body

  if (!title || !message || !tags || !selectedFile) {
    throw new BadRequestError('Provide all values...')
  }
  if (!creator) {
    throw new UnAuthenticatedError('You should login to update post...')
  }
}
