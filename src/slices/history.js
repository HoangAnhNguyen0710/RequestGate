import {createSlice} from '@reduxjs/toolkit';

export const historySlice = createSlice({
    name: "history",
    initialState: {value: []},
    reducers: {
        setHistoryList: (state, action) => {
            state.value = action.payload
        },  
    },
});

export const {setHistoryList} = historySlice.actions;
export default historySlice.reducer;