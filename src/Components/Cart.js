import React, { useEffect, useState } from 'react'
// import { MdOutlineKeyboardBackspace } from 'react-icons/md'
// import Back from ".//img/back.png"
import Dust from ".//img/dust.png"
import {motion} from "framer-motion"

import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/Reducer'

// import Back1 from ".//img/turn-back.png"
import BackArrow from ".//img/right-arrow.png"
import EmptyCart from ".//img/emptyCart.svg";


import  "./Cart.css"
import CartItem from './CartItem'
import { Link } from "react-router-dom";

const Cart = () => {
    const [isMenu, setIsMenu] = useState(false)
    


    const [{cartShow,cartItems,user}, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);

    const showCart = () => {
        dispatch ({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow , //whatever the value of cartshow it is set the value as not cartshow
        });
    }
    
    useEffect(() => {
        let totalPrice = cartItems.reduce(function(accumulator, item){
            return accumulator + item.qty * item.price;
        }, 0);
        setTot(totalPrice);
        console.log(tot)   
    }, [tot, flag]);

    const clearCart = () => {
        dispatch({
          type: actionType.SET_CARTITEMS,
          cartItems: [],
        });
    
        localStorage.setItem("cartItems", JSON.stringify([]));
      };


  return (
    <motion.div
    initial={{opacity:0, x:200}}
    animate={{opacity:1, x:0}}
    exit={{opacity:0, x:200}}
     className='w-full md:w-375 h-screen  bg-black drop-shadow-md flex flex-col
    fixed top-0 right-0 z-[101]'>
        <div className='w-full items-center flex  justify-between p-4 cursor-pointer'>
        <motion.div
        whileTap={{scale:0.75}} onClick={showCart}>
        <img src={BackArrow} alt="home-pic" className='h-10 text-3xl ' />
        </motion.div>
       
        <p className='text-white text-lg font-semibold cart1'>Cart</p>

        <motion.p
         whileTap={{scale:0.75}}
          className='flex items-center gap-2 p-1 px-2 bg-gray-300 rounded-md hover:shadow-md  
         cursor-pointer text-textColor text-base font-semibold' onClick={clearCart} >Clear <img src={Dust} alt="home-pic" className='h-5 ' />
        </motion.p>
        </div>


{/* Bottom section */}

{cartItems && cartItems.length > 0 ? (
    <div className='w-full h-full rounded-t-[2rem] flex flex-col bg-cartBg '>
        {/* cart item section */}
            <div className='w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none '>

            {/* For Cart Item  each and every item in cart) */}
                {
                    cartItems && cartItems.map(item => (
                        <CartItem  key={item.id} item={item}
                        setFlag={setFlag}
                         flag={flag} />
                ))
                }
            </div>

            {/* Cart Total section */}
            <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2 '>
                <div className='w-full flex tems-center justify-between'>
                    <p className='text-gray-400 text-lg'>Sub Total</p>
                    <p className='text-gray-400 text-lg'>₹{tot}</p>
                </div>

                <div className='w-full flex tems-center justify-between'>
                    <p className='text-gray-400 text-lg'>Delivery</p>
                    <p className='text-gray-400 text-lg'>₹ 30</p>
                </div>

                <div className='w-full border-b border-gray-600 my-2'></div>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-gray-200 text-xl font-semibold'>Total</p>
                    <p className='text-gray-200 text-xl font-semibold'>₹{tot + 30}</p>
                </div>

        {user ? (
            <Link to={"/PaymentPage"}>        
            <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
               >
               
                <p className='w-72 p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-black text-lg my-2 hover:shadow-lg'
                // For new item to be dissappeared when clicked
                 onClick = {() => setIsMenu(false)}>Check Out</p>
              </motion.button>
              </Link>

              
        ) :(
            <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to Check Out
              </motion.button>
        )}



        {/* <Link to={"/PaymentPage"}>
                <p className='flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-base'
                // For new item to be dissappeared when clicked
                 onClick = {() => setIsMenu(false)}>Check Out</p>
                </Link> */}

            </div>
        </div>
): (
        <div className='w-full h-full flex flex-col items-center justify-center gap-6 '>
            <img src={EmptyCart} alt='' className='w-300' />
            <p className='text-xl text-textColor font-semibold'>
                Add some items to your cart
            </p>
        </div>
)}

    </motion.div>
  )
}

export default Cart
