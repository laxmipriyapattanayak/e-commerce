import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
const saltRounds = 10
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import User from '../models/User'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError'
import {
  JWT_SECRET,
  CLIENT_URL,
  JWT_AUTHORIZATION_SECRET_KEY,
} from '../util/secrets'
import sendEmailWithNodeMailer from '../helpers/sendEmail'

//register user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, phone } = req.body

    if (!name || !email || !password || !phone)
      throw new NotFoundError('missing name or email or password or phone')

    if (password.length < 6)
      throw new BadRequestError(
        'length of password should be atleast 6 characters'
      )

    const image = req.file
    if (image && image.size > Math.pow(1024, 2))
      throw new BadRequestError(
        'file too large.file size must be less than 1 mb'
      )

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await User.findOne({ email })
    if (user)
      new BadRequestError(
        'user with this email already exist.please sign in',
        400,
        {}
      )

    //create a token for storing data temporarily
    const token = jwt.sign(
      { ...req.body, password: hashedPassword, image: image?.path },
      String(JWT_SECRET),
      { expiresIn: '10m' }
    )

    //prepare emaildata using jwt token
    const emailData = {
      email,
      subject: 'Acount Activation Email',
      html: `
          <h2> Hello ${name}! </h2>
          <p> please click here to <a href="${CLIENT_URL}/activate/${token}" target="_blank">activate your account </a></p>
          `,
    }
    sendEmailWithNodeMailer(emailData)
    res
      .status(200)
      .json({ message: 'email sent,please go to your email', token: token })
  } catch (error) {
    next(error)
  }
}
//verify email
export const verifyUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get token from req body
    const token = req.body.token

    if (!token) throw new NotFoundError('token not found')

    //verify token and decode data
    const decoded: any = jwt.verify(token, String(JWT_SECRET))

    const existingUser = await User.findOne({ email: decoded.email })
    if (existingUser)
      throw new BadRequestError('this account is already activated')

    //create user
    const newUser = new User({ ...decoded })

    //save the user
    const user = await newUser.save()

    //send the response
    if (!user) throw new BadRequestError('user was not created')

    res
      .status(200)
      .json({ message: 'user was created successfully ! please sign in' })
  } catch (error) {
    next(error)
  }
}

//login user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      throw new ForbiddenError('wrong email or password ')
    if (password.length < 6)
      throw new BadRequestError('password must be atleast 6 characters')

    const user = await User.findOne({ email })

    if (!user)
      throw new NotFoundError(
        'user doesnot exist with this email. please register first'
      )

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched)
      throw new ForbiddenError('email/password did not match')

    if (user.isBanned) throw new ForbiddenError('user is banned')

    const token = jwt.sign(
      { _id: user._id },
      String(JWT_AUTHORIZATION_SECRET_KEY),
      { expiresIn: '15m' }
    )
    if (req.cookies[`${user._id}`]) {
      req.cookies[`${user._id}`] = ' '
    }

    res.cookie(String(user._id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 15),
      httpOnly: true,
      //secure: true,
    })

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      image: user.image,
      isAdmin: user.is_admin,
    }
    res.status(200).json({ message: 'user is signed in', user: userData })
  } catch (error) {
    next(error)
  }
}

//logout user
export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.cookie) {
      throw new NotFoundError('no cookie found')
    }
    const token = req.headers.cookie.split('=')[1]

    if (!token) {
      throw new NotFoundError('no token found')
    }
    const decoded: any = jwt.verify(token, String(JWT_AUTHORIZATION_SECRET_KEY))
    if (!decoded) throw new ForbiddenError('Invalid Token')

    if (req.cookies[`${decoded._id}`]) {
      req.cookies[`${decoded._id}`] = ''
    }

    res.clearCookie(`${decoded._id}`)
    res.status(200).json({ message: 'user is loggedout' })
  } catch (error) {
    next(error)
  }
}
//get user profile
export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    if (!user) throw new NotFoundError('user was not found')
    return res
      .status(200)
      .json({ message: 'user returned successfully', user: user })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(new BadRequestError('invalid id'))
      return
    }
    next(error)
  }
}
//get refresh token
export const getRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.cookie) {
      throw new NotFoundError('no cookie found')
    }
    const oldToken = req.headers.cookie.split('=')[1]

    if (!oldToken) {
      throw new NotFoundError('no token found')
    }
    const decoded: any = jwt.verify(
      oldToken,
      String(JWT_AUTHORIZATION_SECRET_KEY)
    )
    if (!decoded) throw new ForbiddenError('invalid token')

    const token = jwt.sign(
      { _id: decoded._id },
      String(JWT_AUTHORIZATION_SECRET_KEY),
      { expiresIn: '15m' }
    )
    if (req.cookies[`${decoded._id}`]) {
      req.cookies[`${decoded._id}`] = ''
    }

    res.cookie(String(decoded._id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 1),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    return res.status(200).json({ message: 'user is signed in', token })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const updatedData = await User.findByIdAndUpdate(
      id,
      { ...req.body, password: hashedPassword }, // image: req.file.filename.image },
      { new: true }
    )
    if (!updatedData) {
      throw new ForbiddenError('invalid user')
    }
    await updatedData.save()
    return res
      .status(200)
      .json({ message: 'user is updated successfully', updatedData })
  } catch (error) {
    next(error)
  }
}

export const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new ForbiddenError(
        'wrong email or password field should not be blank'
      )
    }
    if (password.length < 6) {
      throw new BadRequestError('minimum length for password is 6')
    }

    const user = await User.findOne({ email: email })
    if (!user)
      throw new BadRequestError('user was not found with this email address')

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const token = jwt.sign({ email, hashedPassword }, String(JWT_SECRET), {
      expiresIn: '10m',
    })
    //prepare the email
    const emailData = {
      email,
      subject: 'account activation email',
      html: `
            <h2> Hello ${user.name}! </h2>
            <p> please click here to <a href="${CLIENT_URL}/reset-password/${token}" target="_blank">reset your password</a> </p>
            `,
    }
    sendEmailWithNodeMailer(emailData)
    return res.status(200).json({
      message: 'an email has been sent for reset password',
      token: token,
    })
  } catch (error) {
    next(error)
  }
}
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.body
    if (!token) {
      throw new NotFoundError('token is missing')
    }
    jwt.verify(
      token,
      String(JWT_SECRET),
      async function (err: any, decoded: any) {
        if (err) {
          throw new UnauthorizedError('token is expired')
        }
        //decoded the data
        const { email, hashedPassword } = decoded
        const foundUser = await User.findOne({ email: email })
        if (!foundUser) {
          throw new BadRequestError('user with this email doesnot exist')
        }
        //update the user
        const updateData = await User.updateOne(
          { email: email },
          {
            $set: {
              password: hashedPassword,
            },
          }
        )
        if (!updateData) {
          throw new BadRequestError('reset password was not successful')
        }
        return res
          .status(200)
          .json({ message: 'reset password was successful' })
      }
    )
  } catch (error) {
    next(error)
  }
}
