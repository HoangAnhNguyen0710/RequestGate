import {createSlice} from '@reduxjs/toolkit';

const initialStateValue =  false;
export const authSlice = createSlice({
    name: "isLoggedIn",
    initialState: {value: initialStateValue},
    reducers: {
        setLoggedIn: (state, action) => {
            state.value = action.payload
        }, 
    },
});

export const {setLoggedIn} = authSlice.actions;
export default authSlice.reducer;