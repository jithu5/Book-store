import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adminBooks:[]
}

const adminBookSlice = createSlice({
    name: "adminBooks",
    initialState,
    reducers: {
        setAdminBooks: (state, action) => {
            state.adminBooks = action.payload;
        },
        addAdminBooks:(state, action) => {
            state.adminBooks = [...state.adminBooks, action.payload];
        },
        deleteAdminBooks:(state, action) => {
            state.adminBooks = state.adminBooks.filter(book => book._id!== action.payload);
        },
    },
    
})

export const {setAdminBooks,addAdminBooks,deleteAdminBooks} = adminBookSlice.actions;

export default adminBookSlice.reducer;