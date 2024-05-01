import express from 'express'
const productRouter = express.Router()
import upload from '../middlewares/productUploadFile'
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFilteredProducts,
  getProduct,
  updateProduct,
} from '../controllers/productController'
import { isAdmin, isLoggedIn } from '../middlewares/auth'

productRouter.post(
  '/',
  upload.single('image'),
  isLoggedIn,
  isAdmin,
  createProduct
)
productRouter.get('/', getAllProducts)
productRouter.get('/:slug', getProduct)
productRouter.delete('/:slug', isLoggedIn, isAdmin, deleteProduct)
productRouter.put(
  '/:slug',
  upload.single('image'),
  isLoggedIn,
  isAdmin,
  updateProduct
)
productRouter.post('/filter', getFilteredProducts)

export default productRouter
