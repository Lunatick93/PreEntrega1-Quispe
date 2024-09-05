import {createContext, useState } from "react";

export const ItemsContext = createContext();

export const Provider = ({ children }) => {
    const [items, setItems] = useState([]);

    const reset = () => setItems([]);

    return (
    <ItemsContext.Provider value={{items, reset }}>
        {children}
        </ItemsContext.Provider>
    );
};