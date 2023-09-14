import React, { createContext, useContext, useState } from "react";

const AddressContext = createContext();
const AddressQueryContext = createContext();

export const useAddressContext = () => useContext(AddressContext);
export const useAddressQueryContext = () => useContext(AddressQueryContext);

export const AddressProvider = ({ children }) => {
    const [address, setAddress] = useState({
        val: "",
        geo: null
    });

    return (
        <AddressContext.Provider value={{ address, setAddress }}>
            {children}
        </AddressContext.Provider>
    );
}

export const AddressQueryProvider = ({ children }) => {
    const [addressQuery, setAddressQuery] = useState({
        val: "",
        geo: null
    });

    return (
        <AddressQueryContext.Provider value={{ addressQuery, setAddressQuery }}>
            {children}
        </AddressQueryContext.Provider>
    );
}