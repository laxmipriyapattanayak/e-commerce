import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { getAllCategoriesRequest } from 'services/CategoryService';

export const allCategory: any = createAsyncThunk( "api/categorys/all", async () => {
    const res =  await getAllCategoriesRequest();
    return res;
})

const initialState = {
  categorys: []
} as any

export const categorySlice = createSlice({
  name: 'categorys',
  initialState,
  reducers: {   
    search : (state, action) => {
        
    }
  },
  extraReducers:(builder)=> {
    
    builder.addCase(allCategory.fulfilled,(state, action: {payload: any})=>{
        state.categorys = action.payload
    });
    
    builder.addCase(allCategory.pending,(state, action: {payload: any})=>{
        state.categorys = []
    });
    
    builder.addCase(allCategory.rejected,(state, action: {payload: any})=>{
        state.categorys = []
    });
  }
})

export const { search} = categorySlice.actions
export default categorySlice.reducer