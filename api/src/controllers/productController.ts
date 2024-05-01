import { Request, Response, NextFunction } from 'express'
import slugify from 'slugify'
import Product, { ProductDocument } from '../models/Product'
import { ForbiddenError, NotFoundError } from '../helpers/apiError'

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      description,
      price,
      sold,
      quantity,
      productCategory,
      productType,
      ageGroup,
      shipping,
    } = req.body
    const image = req?.file?.filename
    console.log(req.file)
    const productExist = await Product.exists({ name: name })
    if (productExist) {
      throw new ForbiddenError('product with this name already exist')
    }
    const product = await Product.create({
      name: name,
      slug: slugify(name),
      description: description,
      price: price,
      sold: sold,
      image: image,
      quantity: quantity,
      productCategory: productCategory,
      productType: productType,
      ageGroup: ageGroup,
      shipping: shipping,
    })

    res
      .status(201)
      .json({ message: 'product created successfully', product: { product } })
  } catch (error) {
    next(error)
  }
}

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find().populate('productCategory')

    res.status(201).json({ message: 'our products', products })
  } catch (error) {
    next(error)
  }
}

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const product = await Product.findOne({ slug: slug })

    if (!product) {
      throw new NotFoundError('product not found')
    }

    res
      .status(200)
      .json({ message: 'product return successfully', product: product })
  } catch (error) {
    next(error)
  }
}

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const result = await Product.findOneAndDelete({ slug: slug })
    if (!result) throw new NotFoundError('product not found')

    res.status(200).json({ message: 'product deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter = { slug: req.params.slug }
    const options = { new: true }
    const image = req?.file?.filename
    const updates: any = {}
    Object.keys(req.body).forEach((property) => {
      if (req.body[property]) {
        updates[property] = req.body[property]
      }
    })
    if (image) updates['image'] = image
    const updatedData = await Product.findOneAndUpdate(filter, updates, options)
    if (!updatedData) throw new NotFoundError('product not found')

    res.status(200).json({ message: 'product updated successfully' })
  } catch (error) {
    next(error)
  }
}

export const getFilteredProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { price, productType, ageGroup, name, categoryId } = req.body
    const filter: any = {}
    // To know more on the aggigator operator like $gte, $lte, $regex read from https://www.mongodb.com/docs/manual/reference/operator/aggregation/eq/
    if (price && price.length) {
      filter.price = { $gte: price[0], $lte: price[1] }
    }

    if (productType) {
      filter.productType = productType
    }

    if (ageGroup) {
      filter.ageGroup = ageGroup
    }

    if (name) {
      filter.name = { $regex: name }
    }

    if (categoryId) {
      filter.categoryId = categoryId
    }

    const filterResult = await Product.find(filter)
    res
      .status(200)
      .json({ message: 'product return successfully', products: filterResult })
  } catch (error) {
    next(error)
  }
}
