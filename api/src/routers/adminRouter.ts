import express from 'express'

//import registerUser, verifyUserEmail  from '../controllers/userController';
import upload from '../middlewares/fileUpload'
import {
  bannedUserByAdmin,
  deleteUserByAdmin,
  getAllUsers,
  loginAdmin,
  unbannedUserByAdmin,
} from '../controllers/adminController'
import { isAdmin, isLoggedIn } from '../middlewares/auth'

const routerAdmin = express.Router()

routerAdmin.post('/loginAdmin', loginAdmin)
routerAdmin.get('/dashboard', isLoggedIn, getAllUsers)
routerAdmin.delete('/dashboard/:id', isLoggedIn, isAdmin, deleteUserByAdmin)
routerAdmin.get('/banuser/:id', isLoggedIn, isAdmin, bannedUserByAdmin)
routerAdmin.get('/unbanuser/:id', isLoggedIn, isAdmin, unbannedUserByAdmin)
export default routerAdmin
