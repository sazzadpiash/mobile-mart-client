import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContextLink } from '../../context/AuthContext/AuthContext';
import axios from 'axios';

const Header = ({ bgColor }) => {
    const { user, logOut, setUserRole, userRole, loading } = useContext(AuthContextLink);
    if (user?.uid && !loading) {
        axios.get(`https://mobile-mart-server-rho.vercel.app/users/${user?.email}`)
            .then(function (response) {
                // handle success
                setUserRole(response.data.accountType);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    const handleSignOut = () => {
        logOut()
            .then(() => {
                setUserRole(null)
            })
            .catch(err => console.log(err))
    }
    return (
        <div className={`navbar ${bgColor} py-5`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/blog'>Blog</Link></li>
                        {userRole && <li><Link to='/dashboard'>Dashboard</Link></li>}
                        {
                            user?.uid ? <li><button className='btn btn-primary block md:hidden text-white' onClick={handleSignOut}>Log Out</button></li> : <li><Link to='/login' className="btn btn-primary block md:hidden text-white">Login</Link></li>
                        }
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl"><img src="https://i.ibb.co/2tHThRq/mobile-mart-low-resolution-logo-color-on-transparent-background.png" className='w-28 sm:w-52' alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/blog'>Blog</Link></li>
                    {userRole === 'Admin' && <li><Link to='/dashboard/all-sellers'>Dashboard</Link></li>}
                    {userRole === 'Seller' && <li><Link to='/dashboard/add-product'>Dashboard</Link></li>}
                    {userRole === 'User' && <li><Link to='/dashboard/my-orders'>Dashboard</Link></li>}
                </ul>
            </div>
            <div className="navbar-end">
                <label htmlFor="dashboard-sliders-menu" className="btn btn-primary mr-2 drawer-button lg:hidden">Dashboard</label>
                {
                    user?.uid ? <button className='btn btn-primary hidden md:block' onClick={handleSignOut}>Log Out</button> : <Link to='/login' className="btn btn-primary hidden md:inline-flex">Login</Link>
                }
            </div>
        </div>
    );
};

export default Header;