import { resetPassword } from './../controllers/userController'
import express from 'express'

//import registerUser, verifyUserEmail  from '../controllers/userController';
import upload from '../middlewares/fileUpload'
import {
  forgetPassword,
  getRefreshToken,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  verifyUserEmail,
} from '../controllers/userController'
import { isLoggedIn } from '../middlewares/auth'

const router = express.Router()

router.post('/register', upload.single('image'), registerUser)
router.post('/activate', verifyUserEmail)
router.post('/login', loginUser)
router.post('/logout', isLoggedIn, logoutUser)
router.get('/profile/:id', isLoggedIn, getUserProfile)
router.get('/refresh-token', isLoggedIn, getRefreshToken)
router.put('/:id', isLoggedIn, updateUser)
router.post('/forget-password', forgetPassword)
router.post('/reset-password', resetPassword)
export default router
