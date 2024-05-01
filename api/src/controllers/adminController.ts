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
} from '../helpers/apiError'
import {
  JWT_SECRET,
  CLIENT_URL,
  JWT_AUTHORIZATION_SECRET_KEY,
} from '../util/secrets'
import sendEmailWithNodeMailer from '../helpers/sendEmail'
//login admin
export const loginAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      throw new ForbiddenError('wrong email or password ')
    }

    if (password.length < 6) {
      throw new BadRequestError('password must be atleast 6 characters')
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw new NotFoundError(
        'user doesnot exist with this email. please register first'
      )
    }

    if (user.is_admin === 0) {
      throw new BadRequestError('not an admin')
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if (!isPasswordMatched) {
      throw new BadRequestError('email/password did not match')
    }

    const token = jwt.sign(
      { _id: user._id, isAdmin: user.is_admin },
      String(JWT_AUTHORIZATION_SECRET_KEY),
      { expiresIn: '10m' }
    )

    if (req.cookies[`${user._id}`]) {
      req.cookies[`${user._id}`] = ' '
    }

    res.cookie(String(user._id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 9),
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

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({ is_admin: 0 })
    res.status(200).json({ message: 'returned all user', user: users })
  } catch (error) {
    next(error)
  }
}

export const deleteUserByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const foundUser = await User.findById(id)
    if (!foundUser) throw new BadRequestError('user not found with this id')
    else await User.findByIdAndDelete(id)
    res.status(200).json({ message: 'deleted user successfully' })
  } catch (error) {
    next(error)
  }
}

export const bannedUserByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new NotFoundError(`No user found with id ${id}`)
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          isBanned: true,
        },
      },
      { new: true }
    )
    if (!updateUser) throw new BadRequestError('user is not updated')
    res.status(200).json({ message: 'user is banned', updateUser })
  } catch (error) {
    next(error)
  }
}

export const unbannedUserByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) throw new NotFoundError(`No user found with id ${id}`)
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          isBanned: false,
        },
      },
      { new: true }
    )
    if (!updateUser) throw new BadRequestError('user is still banned')
    res.status(200).json({ message: 'user is unbanned', updateUser })
  } catch (error) {
    next(error)
  }
}
