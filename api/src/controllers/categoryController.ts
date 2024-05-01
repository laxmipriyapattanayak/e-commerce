//import { Category } from 'src/models/Category';
import slugify from 'slugify'
import { Request, Response, NextFunction } from 'express'
import Category from '../models/Category'
import { ForbiddenError, NotFoundError } from '../helpers/apiError'

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body
    const image = req?.file?.filename
    if (!name || !image) {
      throw new ForbiddenError('name shouldnot blank')
    }
    const categoryExist = await Category.exists({ name: name })
    if (categoryExist) {
      throw new ForbiddenError('category with this name already exist')
    }

    const category = await Category.create({
      name: name,
      slug: slugify(name),
      image: image,
    })

    res.status(201).json({
      message: 'category created successfully',
      category: category,
    })
  } catch (error) {
    next(error)
  }
}

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find({})
    res
      .status(201)
      .json({ message: 'categories return successfully', category: categories })
  } catch (error) {
    next(error)
  }
}

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const Categories = await Category.findOne({ slug: slug }).select(
      'name slug'
    )

    res
      .status(201)
      .json({ message: 'category return successfully', category: Categories })
  } catch (error) {
    next(error)
  }
}

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params
    const deletedCategory = await Category.findOneAndDelete({ slug: slug })
    if (!deletedCategory) throw new NotFoundError('category not found')

    res.status(201).json({ message: 'category deleted successfully' })
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body
    const image = req?.file?.filename
    const filter = { slug: req.params.slug }

    const updates = {
      $set: {
        name: name,
        slug: slugify(name),
        image: image,
      },
    }

    const options = { new: true }
    const updatedData = await Category.findOneAndUpdate(
      filter,
      updates,
      options
    )
    if (!updatedData) throw new NotFoundError('category not found')

    res.status(200).json({ message: 'category updated successfully' })
  } catch (error) {
    next(error)
  }
}
