import React from 'react'
import Robot from ".//img/robot.png"
import HeroBg from ".//img/heroBg.png"
import Vector from ".//img/vector.jpg"
import Iphone from ".//img/iphone.png"
import Home from ".//img/home.png"
// import Home1 from ".//img/pp.png"



import {Data_Img} from '../utils/Data_Img'


import {motion} from "framer-motion";
import "./HomeContainer.css"


const HomeContainer = () => {
  return (
    <div className='sex '>

         {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'> */}
         <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full   id = "home'>
      {/* <div className='py-2  flex flex-col items-start  justify-center  md:items-center'> */}
      <div className='py-2  flex flex-col items-start  justify-center  gap-6'>
            <div className='flex items-center gap-2 justify-center bg-orange-200 rounded-full  '>
              <p className='text-black px-3 font-semibold '>Bot Delivery</p>
              <div className=' bg-black w-10 h-10 rounded-full overflow-hidden drop-shadow-xl'>
              {/* Gives motion effect to the robot button  */}
                <motion.img whileTap={{scale:0.6}}
                src={Robot} className="w-full h-full object-contain" alt='robot delivery' />
              </div>
            </div>
            <p className='text-black font-bold tracking-wide text-[2rem]  lg:text-[3.9rem]'>The Fastest Delivery in your <span className='text-orange-500 magic'>City Mates</span></p> 

<p className='text-black text-base text-center md:text-left py-2  '>Satisfy your cravings in minutes with our lightning fast food delivery service. We offer the quickest delivery in the city, bringing your favorite meals straight to your door. From pizza to sushi, burgers to vegan options, we have it all.
Don't wait hours for your food, choose us and have it delivered in no time. Experience the best food delivery service in the city with us. </p>
<button type='button' className=' text-black bg-gradient-to-br from-orange-400 to-orange-500 w-full  md:w-auto px-4 py-2 rounded-lg   hover:shadow-lg transition-all ease-in-out duration-100'>Order Now</button>



      </div>

     
 {/* ******************************************    SECOND CONTAINER      ******************************************  */}
      
       {/* <div className='py-2 flex flex-1 items-center relative '> */}
        {/* <img src={Vector} alt='hero*' /> */}
        {/* <img src={HeroBg} className=" ml-auto  lg:h-650  lg:w-auto h-400 w-full bg-black" alt='hero' /> */}

         {/* <img src={Iphone} className=" ml-auto  lg:h-650  lg:w-auto h-600 w-full lexa" alt='hero'  />

        <div className='w-full h-full absolute flex items-center justify-center top-0 left-0  py-4 gap-4  flex-wrap lg:px-32'>
            {Data_Img && Data_Img.map(n =>(
                <div key={n.id} className='lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg'>
                <img src={n.imageSrc} className="w-20  -mt-10 lg:w-40 lg:-mt-20" alt='ice-cream' />
                <p className=' text-base lg:text-xl font-semibold text-textColor  mt-2 lg:mt-4'>{n.name}</p>

                <p className=' text-[12px] lg:text-sm text-black font-semibold  my-1 lg:my-3'>{n.description}</p>
                <p className='text-sm font-semibold text-headingColor'>
                <span className='text-xs text-red-600'>$</span>{n.price}</p>
            </div>
            ))}
        </div>
      </div>   */}

    <section class="home" id="home">
      


      <div class="image">
          <img src={Home} alt="home-pic" />
      </div>
      </section>

    </section>
  
      </div>
  )
}

export default HomeContainer