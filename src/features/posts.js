import { createSlice } from "@reduxjs/toolkit";
// import { UsersData } from "../login";

export const userSlice = createSlice ({
    name: "users",  //Slice名
    initialState: { value: {} },  //初期状態
    reducers:{
        addUser:(state, action) => {   //action名がaddUser
            state.value=action.payload;
        },
    },

    
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;