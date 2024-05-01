//import createError from 'http-errors';
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError'
import { JWT_AUTHORIZATION_SECRET_KEY } from '../util/secrets'
import User from '../models/User'

interface AuthenticatedRequest extends Request {
  _id?: string
}

export const isLoggedIn = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.cookie) {
      throw new UnauthorizedError('no cookie found')
    }

    const token = req.headers.cookie.split('=')[1]

    if (!token) {
      throw new UnauthorizedError('no token found')
    }

    const decoded: any = jwt.verify(token, String(JWT_AUTHORIZATION_SECRET_KEY))

    if (!decoded) throw new UnauthorizedError('invalid token')
    req._id = decoded._id
    next()
  } catch (error) {
    next(error)
  }
}

export const isAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req._id
    if (id) {
      const user = await User.findById(id)
      if (!user) throw new NotFoundError('no user found with this id')
      if (!user.is_admin) throw new UnauthorizedError('user is not an admin')
      next()
    } else {
      throw new UnauthorizedError('please login')
    }
  } catch (error) {
    next(error)
  }
}
