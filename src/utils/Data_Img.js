import I1 from "../Components/img/i1.png"
import F1 from "../Components/img/f1.png"
import C3 from "../Components/img/c3.png"
import Fi1 from "../Components/img/fi1.png"


// import Fried from "../Components/img/fried-chicken.png"




export const Data_Img = [
    {
        id: 1, 
        name: 'Icecream',
        description: 'Chocolate & Vanilla',
        price: '5.50', 
        imageSrc: I1,
    },
    {
        id: 2,
        name: 'Strawberries',
        description: 'Fresh Strawberries',
        price: '2.50', 
        imageSrc: F1,
        },
    {
        id: 3, 
        name: 'Chicken Kabab', 
        description: 'Spcl Kabab', 
        price: '8.50', 
        imageSrc: C3,
    },
    {id: 4, 
        name: 'Fish', 
        description: 'Appolo Fish', 
        price: '15.50', 
        imageSrc: Fi1,
    },
];


export const categories = [
    {
        id: 1,
        name: "Chicken",
        urlParamName : "chicken",
        // img: {Fried}
    },
    {
        id: 2,
        name: "Curry",
        urlParamName : "curry",
    },
    {
        id: 3,
        name: "Rice",
        urlParamName : "rice",
    },
    {
        id: 4,
        name: "Fish",
        urlParamName : "fish",
    },
    {
        id: 5,
        name: "Fruits",
        urlParamName : "fruits",
    },
    {
        id: 6,
        name: "Icecreams",
        urlParamName : "icecreams",
    },
    {
        id: 7,
        name: "Soft Drinks",
        urlParamName : "drinks",
    },
    {
        id: 8,
        name: 'starters',
        urlParamName: "Starters",
    }
];


// export default Data_Img;
