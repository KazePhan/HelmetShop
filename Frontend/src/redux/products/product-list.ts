import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { Product } from '../../components/product-card';
import { setError } from '../../utils/error';
import publicAxios from '../../utils/public-axios';

export interface ProductSliceState {
  products: Product[];
  loading: boolean;
  error: null | object;
}

const products: Product[] | [] = [];

const initialState: ProductSliceState = {
  products: products,
  loading: false,
  error: null,
};

export const getAllProduct = createAsyncThunk('products/all', async () => {
  try {
    const { data } = await publicAxios.get('/products/all');
    return data;
  } catch (error) {
    const message = setError(error);
    toast.error(message);
  }
});

export const productAll = createSlice({
  name: 'products-all',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productAll;
