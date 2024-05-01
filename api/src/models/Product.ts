import mongoose, { Schema, model, Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  slug: string
  description: string
  image: string
  price: number
  sold: number
  productCategory: any
  productType: string
  ageGroup: string
  quantity: number
  shipping: false
}

const ProductSchema = new Schema<ProductDocument>(
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
      trim: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'category name is required'],
      minlength: [2, 'min length for category is 2 characters'],
      trim: true,
    },
    image: {
      type: String,
      default: 'default.jpg',
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },

    productCategory: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'Category',
    },

    productType: {
      type: String,
      trim: true,
    },
    ageGroup: {
      type: String,
      required: true,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Product = model<ProductDocument>('Product', ProductSchema)

export default Product
