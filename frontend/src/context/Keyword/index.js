import React, { createContext, useState } from "react";

export const KeywordContext = createContext();

export const KeywordProvider = ({ children }) => {
    const [keyword, setKeyword] = useState("");

    return (
        <KeywordContext.Provider value={{ keyword, setKeyword }}>
            {children}
        </KeywordContext.Provider>
    );
}