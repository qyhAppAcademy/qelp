import React, { createContext, useContext, useState } from "react";

const QueryContext = createContext();

export const useQueryContext = () => useContext(QueryContext);

export const QueryProvider = ({ children }) => {
    const [keyword, setKeyword] = useState("");
    const [keywordQuery, setKeywordQuery] = useState("");
    const [address, setAddress] = useState({
        val: "",
        geo: null
    });
    const [addressQuery, setAddressQuery] = useState({
        val: "",
        geo: null
    });

    return (
        <QueryContext.Provider value={{ 
            keyword, setKeyword,
            keywordQuery, setKeywordQuery,
            address, setAddress,
            addressQuery, setAddressQuery
        }}>
            {children}
        </QueryContext.Provider>
    );
}