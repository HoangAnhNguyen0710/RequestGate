import {createSlice} from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: {value: []},
    reducers: {
        setCatList: (state, action) => {
            state.value = action.payload
        },   
    },
});

export const {setCatList} = categoriesSlice.actions;
export default categoriesSlice.reducer;