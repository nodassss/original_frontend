import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice ({
    name: "products",  //Slice名
    initialState: { value: {} },  //初期状態{}
    reducers:{
        addProduct:(state, action) => {   //action名がaddProducts
            state.value=action.payload;
        },
    },
});

export const { addProduct } = productsSlice.actions;
export default productsSlice.reducer;