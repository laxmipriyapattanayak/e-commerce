import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// import session from 'express-session'
// import cookieParser from 'cookie-parser'
// import passport from 'passport'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import userRouter from './routers/userRouter'
import adminRouter from './routers/adminRouter'
import categoryRouter from './routers/categoryRouter'
import productRouter from './routers/productRouter'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

app.use(cors({ credentials: true, origin: 'http://51.20.192.141:3000' }))
//app.use(apiContentType)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
console.log(__dirname)
app.use('/product/image', express.static('public/images/products'))
app.use('/category/image', express.static('public/images/categories'))
/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.initialize())
app.use(passport.session())
*/

// Set up routers
app.use('/api/users', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
