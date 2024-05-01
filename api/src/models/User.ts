import { Schema, model, Document } from 'mongoose'

export type UserDocument = Document & {
  name: string
  email: string
  password: string
  phone: string
  is_admin: number
  createdAt: Date
  image: string
  isBanned: number
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'name is required'],
      minlength: [2, 'min length for name is 2 characters'],
      maxlength: [100, 'maximum length for name is 100 characters'],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v: any) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
        },
        message: 'please enter a valid email',
      },
    },
    password: {
      type: String,
      min: 6,
      required: [true, 'password is required'],
    },
    phone: {
      type: String,
      required: [true, 'phone number  required'],
    },
    is_admin: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      default: '../public/images/users',
    },
    isBanned: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const User = model<UserDocument>('users', userSchema)

export default User
