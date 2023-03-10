import React, { useEffect, useState } from 'react'
import HomeContainer from './HomeContainer';
import Cart from "./Cart";
import { motion } from 'framer-motion';
import {MdChevronLeft, MdChevronRight} from "react-icons/md"



import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';
import MenuContainer from './MenuContainer';


const MainContainer = () => {


  const [{foodItems, cartShow}, dispatch] = useStateValue();
  const [scrollValue, setscrollValue] = useState(0)



  useEffect(() => {}, [scrollValue,cartShow]);


  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>

    {/* ******************** */}
      <HomeContainer /> 
    {/* ******************* */}

      <section className='w-full  my-6  '>
        <div className='w-full flex items-center justify-between'>
          <p className='font-semibold text-2xl relative capitalize text-headingColor
          before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:bottom-0 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
           transition-all ease-in-out duration-100'>
             Fresh & healthy fruits
          </p>

          {/* <div className='hidden md:flex gap-3  items-center'>
            <motion.div  whileTap={{scale: 0.75}}
            className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-600 cursor-pointer transition-all duration-100 ease-in-out shadow-lg flex items-center justify-center'
             onClick={() => setscrollValue(-500)}>
              <MdChevronLeft className='text-lg text-white' />
            </motion.div>
            <motion.div whileTap={{scale: 0.75}}className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-600 cursor-pointer transition-all duration-100 ease-in-out shadow-lg flex items-center justify-center'
            onClick={() => setscrollValue(500)}>
              <MdChevronRight  className='text-lg text-black'/>
            </motion.div> */}


            <div className='md:flex gap-2 items-center justify-center'>
              <motion.div 
              whileTap = {{scale: 0.90}}
              className='w-5 h-5 rounded-full bg-violet-400 hover:bg-blue-300 cursor-pointer ease-in-out flex items-center justify-center'
              onClick={() => setscrollValue(-500)}>
              <MdChevronLeft className='text-lg' />
              </motion.div>

              <motion.div
              whileTap={{scale: 0.90}} // for animation purpose
              className="w-5 h-5 rounded-full bg-violet-400 hover:bg-blue-300 cursor-pointer ease-in-out flex items-center justify-center"
              onClick={() => setscrollValue(500)}>
                <MdChevronRight className='text-lg' />
              </motion.div>
            {/* </div> */}

          </div>
        </div>



{/* If value is true it will act for fruit section
if value is false it acts as main Meny section */}
        <RowContainer  
       scrollValue = {scrollValue}
        flag={true} 
        data ={foodItems?.filter(n => n.category === 'fruits')}/>
      </section>




{/* MENU SECTION */}
    
    <MenuContainer />


   {cartShow && (
    <Cart />
   )}

    </div> 
  )
}

export default MainContainer;