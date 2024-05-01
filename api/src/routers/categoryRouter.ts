import express from 'express'

import { isAdmin } from '../middlewares/auth'
import { isLoggedIn } from '../middlewares/auth'
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/categoryController'
import upload from '../middlewares/categoryUploadFile'
//import upload from '../middlewares/fileUpload'

const categoryRouter = express.Router()

categoryRouter.post(
  '/',
  upload.single('image'),
  isLoggedIn,
  isAdmin,
  createCategory
)
categoryRouter.get('/', getCategories)
categoryRouter.get('/:slug', getCategory)
categoryRouter.delete('/:slug', isLoggedIn, isAdmin, deleteCategory)
categoryRouter.put(
  '/:slug',
  upload.single('image'),
  isLoggedIn,
  isAdmin,
  updateCategory
)

export default categoryRouter
