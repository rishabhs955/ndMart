import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";
import { Product } from "../../types/product";
import { STATUS } from "../../constants/Status";
import { gadgets } from "../../data/gadgets";

interface ProductState {
  products: Product[];
  product: Product;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  status: string;
}

const initialState: ProductState = {
  products: [],
  product: {
    category: "",
    description: "",
    id: 0,
    image: "",
    price: 0,
    title: "",
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  status: "",
};

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleProduct = createAsyncThunk(
  "products/getProduct",
  async (id: number, thunkAPI) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getCategory = createAsyncThunk(
  "products/getCategory",
  async (data: string, thunkAPI) => {
    try {
      return await productService.getCategory(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getGadgetsCategory = createAsyncThunk(
  "products/getGadgetsCategory",
  async (data: string, thunkAPI) => {
    try {
      console.warn(data);
      return await productService.getGadgetsCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getSingleGadget = createAsyncThunk(
  "products/getSingleGadget",
  async (id: number, thunkAPI) => {
    try {
      return await productService.getSingleGadget(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state: ProductState) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(
        getProducts.fulfilled,
        (state: ProductState, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.isSuccess = true;

          state.products = action.payload;
          const gadgetsData = JSON.parse(gadgets);
          gadgetsData.map((data: any) => {
            state.products.push(data);
          });
          state.status = STATUS.IDLE;
        }
      )
      .addCase(getProducts.rejected, (state: ProductState) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(getSingleProduct.pending, (state: ProductState) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(
        getSingleProduct.fulfilled,
        (state: ProductState, action: PayloadAction<Product>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.product = action.payload;
          state.status = STATUS.IDLE;
        }
      )
      .addCase(getSingleProduct.rejected, (state: ProductState) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(getCategory.pending, (state: ProductState) => {
        state.isLoading = true;
        state.status = STATUS.LOADING;
      })
      .addCase(
        getCategory.fulfilled,
        (state: ProductState, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.products = action.payload;
          state.status = STATUS.IDLE;
        }
      )
      .addCase(getCategory.rejected, (state: ProductState) => {
        state.isLoading = false;
        state.isError = true;
        state.status = STATUS.ERROR;
        toast.error(state.status);
      })
      .addCase(
        getGadgetsCategory.fulfilled,
        (state: ProductState, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.products = action.payload;
          state.status = STATUS.IDLE;
        }
      )
      .addCase(
        getSingleGadget.fulfilled,
        (state: ProductState, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.product = action.payload;
          state.status = STATUS.IDLE;
        }
      );
  },
});

export const { productReset } = productSlice.actions;
export default productSlice.reducer;
