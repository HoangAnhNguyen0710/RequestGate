import {createSlice} from '@reduxjs/toolkit';

// const initialStateValue =  {email: "", password: "", role: ""};
export const requestsSlice = createSlice({
    name: "requests_list",
    initialState: {value: []},
    reducers: {
        setRequests: (state, action) => {
            state.value = action.payload
        },

        
    },
});

export const {setRequests} = requestsSlice.actions;
export default requestsSlice.reducer;