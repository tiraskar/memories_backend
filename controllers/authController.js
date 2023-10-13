import User from '../models/auth.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new BadRequestError('Please provide all values.')
  }
  if (password != confirmPassword) {
    throw new BadRequestError("Password and confirm password doesn't match")
  }
  const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) {
    throw new BadRequestError('Email already used.')
  }
  const user = await User.create({ firstName, lastName, email, password })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      firstName: user.firstName,
    },
    token,
    msg: 'User Created Successfully...',
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnAuthenticatedError('Invalid email')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid password')
  }
  const token = user.createJWT()
  user.password = undefined
  res.status(StatusCodes.OK).json({
    user,
    token,
    msg: 'Login Successful',
  })
}

const updateUser = async (req, res) => {
  const { firstName, email, lastName } = req.body
  if (!email || !firstName || !lastName) {
    throw new BadRequestError('Please provide all values.')
  }
  const user = await User.findOne({ id: req.user.userId })

  user.email = email
  user.firstName = firstName
  user.lastName = lastName

  await user.save()

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token })
}

export { register, login, updateUser }
