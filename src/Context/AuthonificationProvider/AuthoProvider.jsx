import React, { createContext, useEffect, useState } from 'react';

export let authContext = createContext();

const AuthoProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    useEffect(() => {
       if(localStorage.getItem('tkn') != null){
        setToken(localStorage.getItem('tkn'))
       }
    }, [])
    return <>
        <authContext.Provider value={{ token , setToken }}>
            {children}
        </authContext.Provider>

    </>;
}


export default AuthoProvider;