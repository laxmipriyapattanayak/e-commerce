import multer from 'multer'
import { Request } from 'express'

const FILE_SIZE = 1024 * 1024 * 2
const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, 'public/images/categories')
  },
  filename: function (req: Request, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload: multer.Multer = multer({
  storage: storage,
  limits: { fileSize: FILE_SIZE },
})
export default upload
