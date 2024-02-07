import React, {useState, useEffect} from "react";

const DummyContext = React.createContext();

export const useDummy = () => {
    return React.useContext(DummyContext);
}

export const DummyProvider = ({children}) => {
    //state declaration

    //function declaration

    return (
        <DummyContext.Provider value={{}}> 
            {children}
        </DummyContext.Provider>
    )

}