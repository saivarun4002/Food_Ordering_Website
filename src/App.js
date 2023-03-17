import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import {Header,CreateContainer,MainContainer,Login, Signup,Payment} from "./Components"
import { useStateValue } from './context/StateProvider'
import { getAllFoodItems } from './utils/firebaseFunctions'
import { actionType } from './context/Reducer'



const App = () => {

  const [{foodItems}, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      // console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }


  useEffect(() => {
    fetchData();
  },[])


  return (

    <AnimatePresence exitBeforeEnter>
          <div className='w-screen h-auto flex flex-col bg-primary'>
      <Header />

      {/* <main className='mt-7 px-16  w-full text-sky-400  py-20'> */}
      <main className='mt-16 md:mt-24 px-16 w-full text-black py-2 '>
         <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
      
            <Route path="/loginPage" element={<Login />} />
    
            <Route path='/SignupPage' element={<Signup />} />

            <Route path='/PaymentPage' element={<Payment />} />
              
              
//             <Route path='/Location' element={<Location />} />

           
         </Routes>
      </main>
      
    </div>

    </AnimatePresence>

  )
}

export default App;
