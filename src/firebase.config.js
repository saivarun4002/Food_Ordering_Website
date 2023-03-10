import {getApp , getApps, initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA7ZgCuubAGvtlhbxXe-lGCELlYwsa9b7A",
    authDomain: "foodorder-2242a.firebaseapp.com",
    databaseURL: "https://foodorder-2242a-default-rtdb.firebaseio.com",
    projectId: "foodorder-2242a",
    storageBucket: "foodorder-2242a.appspot.com",
    messagingSenderId: "878571320944",
    appId: "1:878571320944:web:d55d560f61c8b850cce6b5"
  };

// if length is > 0 then get that app information 
//if there is no app initialize the new APP 
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)
const storage = getStorage(app)


export const auth = getAuth(app);

export {app,firestore,storage}; 