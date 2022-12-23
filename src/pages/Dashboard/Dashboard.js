import React, { useContext } from 'react';
import { AuthContextLink } from '../../context/AuthContext/AuthContext';

const Dashboard = () => {
    const {user}  = useContext(AuthContextLink)
    return (
        <div className='mt-10 flex flex-col items-center justify-center'>
            Welcome {user.displayName}
        </div>
    );
};

export default Dashboard;