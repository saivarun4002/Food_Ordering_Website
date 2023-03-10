// We are going to define all the initial state of the user
import { fetchCart, fetchUser } from "../utils/fetchLocalStorage";

const userInfo = fetchUser()
const cartInfo = fetchCart()

export const initialState = {
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo,

};


