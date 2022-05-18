import { createSlice } from "@reduxjs/toolkit";

export const userList = createSlice({
    name: "userList",
    initialState: {value: []},
    reducers: {
        setUserList: (state, action) => {
            state.value = action.payload
        }, 
    },
});
export const {setUserList} = userList.actions;
export default userList.reducer;