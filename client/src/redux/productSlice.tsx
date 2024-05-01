import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProductsRequest,filterProduct } from 'services/ProductService'

export const readAllProduct: any = createAsyncThunk( "api/products/all", async () => {
    const res =  await getAllProductsRequest();
    return res;
})

export const filter: any = createAsyncThunk( "api/products/filter", async (body:any) => {
  const res =  await filterProduct(body);
  return res;
})

const initialState = {
  all_products: [],
  favorite: [],
  cart: []
} as any

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    removeProduct:(state, action) => {
      state.all_products = state.all_products?.filter((p:any) => p.slug !== action.payload)
    },
    addToFavorite: (state, action) => {
      if(state.favorite.includes(action.payload)) {
        //Don't do anything , it's a duplicate
      } else {
        state.favorite.push(action.payload)
      }
    },
    removeFromFavorite: (state, action) => {
      state.favorite = state.favorite.map((fav:any)=> fav._id !== action.payload._id)
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload)
    },
    removeFromCart: (state, action) => {
      //state.cart = state.cart.filter((c:any)=> c._id !== action.payload._id)
      //is the product available for delete ?
      
      const isAvilable = state.cart.find((p:any) => p._id === action.payload._id)
      if(isAvilable) {
        //find the Index
        const i = state.cart.findIndex((c:any) => c._id === action.payload._id)
        //remove it from the array arr.splice(indexOfTheProduct, numberOfElelmentToBeDelete)
        state.cart.splice(i, 1)
      }
      
    }
  },
  extraReducers:(builder)=> {
    
    builder.addCase(readAllProduct.fulfilled,(state, action: {payload: any})=>{
        state.all_products = action.payload
    });
    builder.addCase(readAllProduct.pending,(state, action: {payload: any})=>{
        state.all_products = []
    });
    builder.addCase(readAllProduct.rejected,(state, action: {payload: any})=>{
        state.all_products = []
    });

    builder.addCase(filter.fulfilled,(state, action: {payload: any})=>{
      state.all_products = action.payload
    });
    builder.addCase(filter.pending,(state, action: {payload: any})=>{
        state.all_products = []
    });
    builder.addCase(filter.rejected,(state, action: {payload: any})=>{
        state.all_products = []
    });
  }
})

export const { addToFavorite, removeFromFavorite, addToCart, removeFromCart, removeProduct} = productSlice.actions
export default productSlice.reducer