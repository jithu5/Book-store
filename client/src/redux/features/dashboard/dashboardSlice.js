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
        updateBooks:(state, action) => {
            // state.adminBooks = state.adminBooks.map(book => book._id === action.payload._id? action.payload : book);
            const index = state.adminBooks.findIndex(book => book._id === action.payload._id);
            console.log(index)
            if(index !== -1) {
                state.adminBooks[index] = action.payload;
            }
        },
        clearBooksInAdmin:(state, action) => {
            state.adminBooks = [];
        },
    },
    
})

export const {setAdminBooks,addAdminBooks,deleteAdminBooks,updateBooks,clearBooksInAdmin} = adminBookSlice.actions;

export default adminBookSlice.reducer;