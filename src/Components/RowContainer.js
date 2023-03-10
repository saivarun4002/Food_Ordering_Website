import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "./img/NotFound.svg";


import Trolley from ".//img/trolley.png"
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/Reducer";
// import { useStateValue } from "../context/StateProvider";
// import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);


  const [{cartItems}, dispatch] = useStateValue();
  const addtocart = () => {
    // setItems([...cartItems, item])
    // console.log(item)
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items)) //because if we refresh the screen array becomes 0 again
  }

//   const [{ cartItems }, dispatch] = useStateValue();

//   const addtocart = () => {
//     dispatch({
//       type: actionType.SET_CARTITEMS,
//       cartItems: items,
//     });
//     localStorage.setItem("cartItems", JSON.stringify(items));
//   };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  // useEffect(() => {
  //   addtocart();
  // }, [items]);



  useEffect(() => {
    addtocart()
  }, [items])


  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >

    {/* If there is data load this one */}

    {/* If we dont give data.length it will return data as empty array */}

    
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-300 h-[225px] min-w-[300px] md:w-340  md:min-w-[340px] my-12 shadow-md backdrop-blur-lg bg-black  rounded-lg  p-2  hover:drop-shadow-lg hover:bg-bitch flex flex-col items-center justify-between"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center cursor-pointer hover:shadow-md"
                // onClick={() => setItems([...cartItems, item])}

              // call it as call back function and we will send item inside
                onClick={() => setItems([...cartItems, item])}
                >
                {/* <MdShoppingBasket className="text-white" /> */}
                <img src={Trolley} alt='cart' />

              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="font-semibold textbase md:text-lg px-2 text-white">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-orange-100">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg  font-semibold  text-white">
                  <span className="text-sm text-red-500">₹</span> {item?.price}
                </p>
              </div>
            </div>

            {/* if there is no data instaed of this one it should display something else */}
          </div>

          
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
        <img src={NotFound} alt="img" className='h-340' />
          <p className="text-xl text-black font-semibold my-2">
            Items Not  Currently Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;