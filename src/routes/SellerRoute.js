import React, { useContext } from 'react';
// import { useLocation } from 'react-router-dom';
import { AuthContextLink } from '../context/AuthContext/AuthContext';

const SellerRoute = ({children}) => {
    const { userRole, loading } = useContext(AuthContextLink);
    // const location = useLocation();

    if (loading) {
        return <p>loading...</p>
    }

    if (userRole === 'Seller') {
        return children;
    }

    return <p>You are not allowed to visit this page</p>;
    // return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default SellerRoute;