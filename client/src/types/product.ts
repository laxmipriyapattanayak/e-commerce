export interface ProductState {
    products: ProductType[]
    inprogress: boolean
    message: string
}

export type ProductType = {
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
  