// where we create our context informations

//HOOKS
import React, {createContext, useContext, useReducer} from "react";



export const StateContext = createContext();



//We are passing objects as reducer children.......
// children is our component
export const StateProvider = ({reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
      {children}
    </StateContext.Provider>
);


export const useStateValue = () => useContext(StateContext);
