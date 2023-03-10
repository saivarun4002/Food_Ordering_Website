// To save the fire base information , functions all those things 

import { async, FirebaseError } from "@firebase/util";
import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";


//SAVING NEW ITEM'S

export const saveItem = async(data) => {
    // is a function which is comming from Firebase
    // which helps to set a new value , even the value is not there it will create it , if it's already there it update's it


    //data.....what we are receving we are sending that one 
    //foodItems...is the collection name
    await setDoc(doc(firestore, "foodItems", `${Date.now()}`,),data,  {merge: true}
    )
}


// To get all food items

export const getAllFoodItems = async () => {
    // get docs method help's to get all the details from the firestore database

    const items = await getDocs(
        // desc ->  ordering in .....descending order 
        query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
}