import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContextLink } from '../context/AuthContext/AuthContext';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContextLink);
    const location = useLocation();

    if(loading){
        return <p>loading...</p>
    }

    if(user){
        return children
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRoutes;