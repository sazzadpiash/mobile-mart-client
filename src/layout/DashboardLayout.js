import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import { AuthContextLink } from '../context/AuthContext/AuthContext';

const DashboardLayout = () => {
    const { userRole } = useContext(AuthContextLink);
    return (
        <>
            <Header bgColor='bg-violet-100'></Header>
            <div className="drawer drawer-mobile">
                <input id="dashboard-sliders-menu" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <label htmlFor="dashboard-sliders-menu" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-sliders-menu" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-violet-100 text-base-content">
                        {userRole === 'Admin' && <>
                            <li><Link to='/dashboard/all-sellers' className='border border-primary mb-5'>All Sellers</Link></li>
                            <li><Link to='/dashboard/all-buyers' className='border border-primary mb-5'>All Buyers</Link></li>
                        </>}
                        {userRole === 'Seller' && <>
                            <li><Link to='/dashboard/add-product' className='border border-primary mb-5'>Add A product</Link></li>
                            <li><Link to='/dashboard/my-product' className='border border-primary mb-5'>My Products</Link></li>
                        </>}
                        {userRole === 'User' && <>
                            <li><Link className='border border-primary mb-5'>My orders</Link></li>
                        </>}

                    </ul>

                </div>
            </div>
        </>

    );
};

export default DashboardLayout;