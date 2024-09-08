import React, { createContext, useContext, useState } from 'react';

const productContext = createContext();


export const ProductContextProvider = ({ children }) => {
    const [allProductsContext, setallProductsContext] = useState([])
    const [cartCount, setcartCount] = useState(0)
    const [oldPriceTotal, setoldPriceTotal] = useState(0);
    const [newPriceTotal, setnewPriceTotal] = useState(0);
    const [allCartProducts, setallCartProducts] = useState([])
    const [allOrderedProduct, setallOrderedProduct] = useState([])

    return (
        <productContext.Provider value={{
            allProductsContext, setallProductsContext, cartCount, setcartCount,
            oldPriceTotal, setoldPriceTotal, newPriceTotal, setnewPriceTotal, allCartProducts, setallCartProducts, allOrderedProduct, setallOrderedProduct
        }}>
            {children}
        </productContext.Provider>
    );
};

export const useProductContext = () => {
    return useContext(productContext);
}
