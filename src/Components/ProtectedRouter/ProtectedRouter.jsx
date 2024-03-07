import React, { useContext } from 'react';
import { authContext } from "../../Context/AuthonificationProvider/AuthoProvider";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
    const { token } = useContext(authContext);
    if (token == null) {
        return <Navigate to='/' />;
    }
    return <>
        {children}
    </>;
}


export default ProtectedRouter;