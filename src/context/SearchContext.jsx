import { createContext, useState, useContext } from "react";
const SearchContext = createContext();
export function SearchProvider({ children }) {
    const [busqueda, setBusqueda] = useState("");
    return (
        <SearchContext.Provider value={{ busqueda, setBusqueda }}>
            {children}
        </SearchContext.Provider>
    );
}
export function useSearch() {
    return useContext(SearchContext);
}