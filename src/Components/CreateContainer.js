// import GooglePlayButton from "@google-pay/button-react"



import React, { useState } from 'react'
import { motion } from "framer-motion";
// import {MdFastfood} from "react-icons/md"
import Burger from ".//img/burger.png"
import Dish from ".//img/dish.png"
import Wallet from ".//img/wallet.png"
import Loader from "./Loader.js"

import { MdCloudUpload, MdDelete} from 'react-icons/md';

import {categories} from '../utils/Data_Img'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/Reducer';

const CreateContainer = () => {

  // these all are states
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);

  // Boolean value to monitor wether there is any error
  // if there is any error we have to display those fields

  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);

  //Loading status
  const [isLoading, setIsLoading] = useState(false);


  const [{foodItems}, dispatch] = useStateValue();

  

  const uploadImage = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0]
        // console.log(imageFile)
        const storageRef = ref(storage,`Images/${Date.now()}-${imageFile.name}`) //Using Dynamic string 
        //To calculate no of byte's uploaded
        const uploadTask = uploadBytesResumable(storageRef,imageFile)

        uploadTask.on("state_changed" , (snapshot) =>{
          //every single time video is getting uploaded
          const uploadProgress= (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) =>{
          console.log(error)
          prompt(error)
          setFields(true)
          setMsg("Error while uploading: Try Again 🫠🤪")
          setAlertStatus("danger")
          // we need to remove alert after 4 seconds
          setTimeout( () => {
            setFields(false)
            setIsLoading(false)
          },4000)
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setImageAsset(downloadURL)
            setIsLoading(false)
            setFields(true)
            setMsg("Image uploaded successfully 😈");
            setAlertStatus("success")
            setTimeout(() => {
              setFields(false)
            },4000)
          })
        })

  }

  const deleteImage = () => {
      setIsLoading(true)
      const deleteRef = ref(storage, imageAsset)
      deleteObject (deleteRef).then(() => {
        setImageAsset(null)
        setIsLoading(false)
        setFields(true)
        setMsg("Image deleted Successfully 😉")
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false)
        },4000)
      })
  }

  const saveDetails = () => {
      setIsLoading(true)
      try {
          if((!title || !calories || !imageAsset || !price || !category)){
            setFields(true)
            setMsg("Required fields can't be empty ❌")
            setAlertStatus("danger")
            // we need to remove alert after 4 seconds
            setTimeout( () => {
              setFields(false)
              setIsLoading(false)
            },4000)
          }
          else{
            const Data = {
              id: `$(Date.now())`,
              title: title,
              imageURL: imageAsset,
              category: category,
              calories: calories,
              qty: 1,
              price: price
            }
      saveItem(Data)
            setIsLoading(false)
            setFields(true)
            setMsg("Data uploaded successfully 😎")
            setAlertStatus("success")
            setTimeout( () => {
              setFields(false)
              clearData()
            },4000)

          }
      } 
      catch (error) {
        console.log(error)
        prompt(error)
        setFields(true)
        setMsg("Error while uploading: Try Again 🫠🤪")
        setAlertStatus("danger")
        // we need to remove alert after 4 seconds
        setTimeout( () => {
          setFields(false)
          setIsLoading(false)
        },4000)
      }

      fetchData()

  }

// FOR clearing the data
  const clearData = () => {
    setTitle("")
    setImageAsset(null)
    setCalories("")
    setPrice("")

  }


  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      // console.log(data);
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }




  return (
    <div className='w-full min-h-screen  flex items-center justify-center '>
      <div className='w-[90%] md:w-[75%] border border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
        {
          fields && (
       
            <motion.p
             initial = {{opacity: 0}}
             animate = {{opacity: 1}}
             exit = {{opacity: 0}}
             className={`w-full p-2 rounded-lg text-center ${alertStatus === 'danger' ? 'bg-red-700 text-black text-lg font-bold' : 'bg-emerald-400 text-emerald-800'}`}>
                {msg}
            </motion.p>
          )}

          <div className='w-full py-2 border-b flex border-gray-400 items-center gap-2'>
            {/* <MdFastfood /> */}
            <img src={Burger} className="h-10"alt='burger' />
            <input type="" required value={title} 
            onChange={(e) =>setTitle(e.target.value)}
            placeholder="Give me a title..." 
              className='w-full h-full text-lg bg-transparent font-semibold placeholder:text-gray-500 text-black border-none outline-none'/>
          </div>


          <div className='w-full '>
            <select onChange={(e) => setCategory(e.target.value)} className="outline-none w-full text-base border-b-2 border-gray-500 p-2 rounded-md cursor-pointer">
              <option value="other" className='bg-white'>Select Category</option>
              {categories &&  categories.map(item => (
                  <option key={item.id} className="text-base border-0 outline-none capitalize "   value={item.urlParamName}>
                    {item.name}
                  </option>
              ))}
            </select>
          </div>



          {/* Box to upload the Image */}

          <div className=' group flex justify-center flex-col items-center border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
                    {isLoading ? <Loader /> : <>
                        {!imageAsset ? <>
                          <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                                <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                                  <MdCloudUpload  className='text-gray-500 text-3xl hover:text-gray-700'/>
                                  <p className='text-gray-500  hover:text-gray-700'>Click here to upload</p>
                                </div>

                                <input type="file" name='uploadimage' accept='image/*'
                                onChange={uploadImage}  className="w-0 h-0"/>
                          </label>
                        </> 
                        : <>
                        <div className='relative h-full'>
                            <img src={imageAsset} alt="uploadedimage" className='w-full h-full object-cover'/>
                            <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md
                            duration-500 transition-all ease-in-out'
                             onClick={deleteImage}>
                              <MdDelete  className='text-white'/>
                            </button>
                        </div>
                        </>}
                     </>}
          </div>


          {/* CALORIES BOX */}

          <div className='w-full flex flex-col md:flex-row items-center gap-3'>
            <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
              <img src={Dish} className="h-10" alt='dish' />
              <input type="text" 
              required 
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder='Calories' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500 text-black' />
            </div>


            {/* PRICE */}

           
            <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
              <img src={Wallet} className="h-10" alt='dish' />
              <input type="text" 
              required 
              value={price}
              onChange = {(e) => setPrice(e.target.value)}
              placeholder='price' 
              className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500 text-black' />
            </div>
            </div>


          {/* Button for saving the information */}

          <div className='flex items-center w-full'>
            <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg
            text-lg font-semibold text-black' 
            onClick={saveDetails}>
              Save
            </button>
          </div>






      </div>
    </div>
  )
}

export default CreateContainer;
