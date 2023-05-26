import React , {useState} from 'react'
import  "./Header.css"
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";


import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from "../firebase.config";


import Hen from "./img/hen.png";
import Gamer from "./img/gamer.png";
import Avatar from "./img/avatar.png"
import {motion} from "framer-motion";
import { Link } from "react-router-dom";
import { actionType } from '../context/Reducer';






function Header() {

    const firebaseAuth = getAuth(app);
    // We need to create a new Provider
    const Provider = new GoogleAuthProvider()


    const [{user, cartShow,cartItems}, dispatch] = useStateValue()

    const [isMenu, setIsMenu] = useState(false)

    const login = async ()=>{

        //login function should happend only if there is no user
        if (!user) {
            const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, Provider)
            dispatch({
                type : actionType.SET_USER,
                user : providerData[0]
            });
            localStorage.setItem('user',JSON.stringify(providerData[0]) )
        }
       // if that is an user ........if it is true make it true.......if it is false make it false
        else{
            setIsMenu(!isMenu)
        }
    }


    const logout = () => {
        setIsMenu(false);
        localStorage.clear();

        dispatch ({
            type: actionType.SET_USER,
            user: null,
        });
    };

    const showCart = () => {
        dispatch ({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow , //whatever the value of cartshow it is set the value as not cartshow
        });
    }




  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16  bg-black'>
        {/* For Desktop */}
        <div className='hidden md:flex w-full h-full items-center justify-between '>
            <Link  to={'/'} className='flex items-center gap-2'>
                <motion.img whileTap={{scale:0.6}}
                 src={Hen} className="w-10 object-cover" alt='logo'/>
                <p className=' text-xl font-bold hello'>Che<span className="gay">fy</span></p>
            </Link>

       <div className='flex items-center gap-8'>
       <motion.ul 
       initial={{opacity: 1 , x: 200}}
       animate={{opacity: 1 , x: 0}}
       exit={{opacity: 1 , x: 200}}
       className='flex items-center gap-8'>
                <li className='hello cursor-pointer'>Home</li>
                <li className='hello cursor-pointer'>Menu</li>
                <li className='hello cursor-pointer'>About Us</li>
                <li className='hello cursor-pointer'>Service</li>
            </motion.ul>

 {/* CART */}
            <div className='relative flex items-center justify-center' onClick={showCart} >
                <MdShoppingBasket className=' hello  cursor-pointer' />

              {/* Needs to be rendered only if there are cart-items */}
              {cartItems && cartItems.length > 0 &&  (
                <div className=' absolute -top-3 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                    <p className=' text-xs  text-white textwhite font-semibold'>{cartItems.length}</p>
                </div>
              )}
            </div>



          <div className='relative'>
          <motion.img whileTap={{scale:0.6}}
          // if there is an user display user information(img) otherwise display avatar
           src = {user ? Gamer : Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer" alt='profile'
           onClick={login} 
           />
 
 
 {/* **************************** MENU ********************************** */}
      {/* that means if it is true render it otherwise don't render it */}
           {
            isMenu && (
                <motion.div 
                initial={{opacity: 0, scale: 0.6}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.6}}
                className='w-40 bg-slate-200 shadow-xl rounded-lg flex flex-col absolute  top-12 right-0 '>

           { user && user.email === "saivarunavadhuta@gmail.com" && (
            <div>
                <Link to={"/createItem"}>
                <p className='flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-base'
                // For new item to be dissappeared when clicked
                 onClick = {() => setIsMenu(false)}>New Item <MdAdd /></p>
                </Link>

                <Link to={"/loginPage"}>
                    <p className='flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-base'
                    onClick={() => setIsMenu(false)}>Login</p>
                </Link>


                <Link to={"/SignupPage"}>
                    <p className='flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-base'
                    onClick={() => setIsMenu(false)}>Signup</p>
                </Link>
            </div>
            

            )}




                {/* <p className='flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-base'>New Item <MdAdd /></p> */}
                <p className='flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-base
                ' onClick = {logout}>Logout <MdLogout /></p>
           </motion.div>
            )
           }

          </div>


       </div>

        </div>


{/* *************************************************************  MOBILE VIEW   ************************************************************* */}
        {/* For Mobile */}
        <div className='flex  items-center justify-between md:hidden w-full h-full'>

        <div className='relative flex items-center justify-center' onClick={showCart} >
                <MdShoppingBasket className=' hello  cursor-pointer' />
                
                {cartItems && cartItems.length > 0 &&  (
                <div className=' absolute -top-3 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                    <p className=' text-xs  text-white textwhite font-semibold'>{cartItems.length}</p>
                </div>
              )}
            </div>



            <Link to={"/"} className="flex items-center gap-2">
          <img src={Hen} className="w-8 object-cover" alt="logo" />
          <p className="text-white text-xl font-bold"> Chefy</p>
        </Link> 

        


        <div className='relative'>
          <motion.img 
          whileTap={{scale:0.6}}
          // if there is an user display user information(img) otherwise display avatar
           src = {user ? Gamer : Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer" alt='profile'
           onClick={login} 
           />
 
 

      {/* that means if it is true render it otherwise don't render it */}
           {
            isMenu && (
                <motion.div 
                initial={{opacity: 0, scale: 0.6}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.6}}
                className='w-40 bg-slate-200 shadow-xl rounded-lg flex flex-col absolute  top-12 right-0 '>
           {user && user.email === "saivarunavadhuta@gmail.com" && (
                <Link to={"/createItem"}>
                <p className='flex items-center px-4 py-2 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-base'>New Item <MdAdd /></p>
                </Link>
            )
           }

           <ul className='flex  flex-col'>
                <li className='cursor-pointer px-4 py-2 hover:bg-slate-300'onClick = {() => setIsMenu(false)}>Home</li>
                <li className='cursor-pointer px-4 py-2 hover:bg-slate-300'onClick = {() => setIsMenu(false)}>Menu</li>
                <li className='cursor-pointer px-4 py-2 hover:bg-slate-300'onClick = {() => setIsMenu(false)}>About Us</li>
                <li className='cursor-pointer px-4 py-2 hover:bg-slate-300'onClick = {() => setIsMenu(false)}>Service</li>
                <li className='cursor-pointer px-2 py-4 hover:bg-yellow-300'onClick={() => setIsMenu(false)}>@_s_v_</li>
            </ul>

                <p className='flex items-center m-2 p-2 shadow-md gap-3 cursor-pointer transition-all duration-100 ease-in-out text-base justify-center bg-gray-200 hover:bg-gray-300 
            '  onClick = {logout}>Logout <MdLogout /></p>
           </motion.div>
            )
           }

           

          </div>
        </div>
       


    </header>
  )
}

export default Header
