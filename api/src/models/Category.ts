import mongoose, { Schema, model, Document } from 'mongoose'

export type CategoryDocument = Document & {
  name: string
  slug: string
  image: string
}

const CategorySchema = new Schema<CategoryDocument>(
  {
    name: {
      type: String,
      required: [true, 'category name is required'],
      minlength: [2, 'min length for category is 2 characters'],
      maxlength: [40, 'maximum length for category is 100 characters'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: [true, 'category slug is'],
      trim: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      default: 'default.jpg',
    },
  },
  { timestamps: true }
)

const Category = model<CategoryDocument>('Category', CategorySchema)

export default Category
