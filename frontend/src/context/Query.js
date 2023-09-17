import { createContext, useState, useContext } from "react";

const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
    const [keywordQuery, setKeywordQuery] = useState("");
    const [addressQuery, setAddressQuery] = useState({
        val: "",
        geo: null
    });

    return (
        <QueryContext.Provider value={{
            keywordQuery, setKeywordQuery,
            addressQuery, setAddressQuery
        }}>
            {children}
        </QueryContext.Provider>
    );
};

export const useQueryContext = () => useContext(QueryContext);