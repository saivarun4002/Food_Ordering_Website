import React, { useEffect, useState } from 'react'
import Hot from ".//img/hot-pot.png";
import Tea from ".//img/tteok.png"
import {categories} from "../utils/Data_Img"
import { IoFastFood } from "react-icons/io5";


import { motion } from "framer-motion";
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';


const MenuContainer = () => {


    const [filter, setFilter] = useState('chicken')

    // To update the state
    useEffect(() => {}, [filter])

    const [{foodItems}, dispatch] = useStateValue()
  return (
   <section className='w-full my-6' id='menu'>
    <div className='w-full flex flex-col items-center justify-center'>
        <p className='font-semibold text-2xl relative capitalize text-headingColor
          before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:bottom-0 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600
           transition-all ease-in-out duration-100 mr-auto'>
            Our Hot Dishes
           </p>

           {/* <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none'>
                {categories && categories.map(category => (
                    <div  key={category.id} 
                    className={`group w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center
            duration-150 transition-all ease-in-out ${filter ===category.urlParamName ? 'bg-cartNumBg' : "bg-card"} hover:bg-red-400 `}>

                <div className={`w-10 h-10 rounded-full  ${filter ===category.urlParamName ? 'bg-white' : 'bg-cartNumBg'}
                 group-hover:bg-yellow-400 items-center  justify-center `}>
                    <img src={Hot} alt="icon"  className={` text-card group-hover:text-textColor text-lg  ${filter ===category.urlParamName ? "text-textColor" : " text-white"}`}/>
                </div>

                <p className={`${filter ===category.urlParamName ? "text-white" : 'text-textColor'} text-sm group-hover:text-black`}>
                {category.name}</p>




            </div> */}




            <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center`}
                >

                {/* ICONS */}

                   <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  /> 

                  {/* <img src={Tea} alt="icon"  className={` text-card group-hover:text-textColor text-lg  ${filter ===category.urlParamName ? "text-textColor" : " text-white"}`}/> */}
                  
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

{/* To filter the Food Categories */}
        <div className='w-full'>
            <RowContainer flag={false} data={foodItems?.filter(n => n.category === filter )} />
        </div>
        {/* </div> */}
                {/* ))}
           </div> */}
    </div>
   </section>
  )
}

export default MenuContainer