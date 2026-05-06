import { createSlice} from '@reduxjs/toolkit';

const initialState= {
    cartItems:[],
};

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state, action) => {
            const product = action.payload;
            const existingItem = state.cartItems.find((item) => item.id ===product.id);
            if(existingItem){
                if(existingItem.quantity < product.stock){
                    existingItem.quantity += 1;
                }
            } 
            else {
                if(product.stock > 0){
                    state.cartItems.push({...product, quantity:1});
            }
            }
        },

        removeFromCart:(state, action) => {
            state.cartItems =state.cartItems.filter((item) => item.id !== action.payload);
        },

        increaseQuantity:(state, action) => {
            const item = state.cartItems.find((item) => item.id=== action.payload);
            if (item&& item.quantity <item.stock){
                item.quantity+=1;
            }
    },

    decreaseQuantity: (state, action) => {
        const item =state.cartItems.find((item) => item.id=== action.payload);
        if (item.quantity>1){
            item.quantity-=1;
        }
    },
},
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;