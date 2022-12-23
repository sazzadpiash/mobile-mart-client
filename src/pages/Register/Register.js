import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContextLink } from '../../context/AuthContext/AuthContext';

export const newUser = (userData) => {
    fetch('https://mobile-mart-server-rho.vercel.app/users', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(() => { })
        .catch(err => console.log(err))
}

const Register = () => {
    const { createUser, profileUpdate, googleLogin } = useContext(AuthContextLink);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const displayName = result.user.displayName;
                const email = result.user.email;
                const accountType = 'User';
                newUser({ displayName, email, accountType })
                navigate(from, { replace: true })
            })
    }

    const handleRegister = (event) => {
        event.preventDefault();
        const displayName = event.target.fullName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const accountType = event.target.accountType.value;
        // const termsAndConditions = event.target.termsAndConditions.value;
        // console.log({ displayName, email, password, accountType, termsAndConditions })
        createUser(email, password)
            .then(data => {
                if (data.user.uid) {
                    profileUpdate({ displayName })
                        .then(() => navigate(from, { replace: true }))
                        .catch(err => console.log(err))
                    newUser({ displayName, email, accountType });
                }
            })
            .catch(error => console.error(error))
    }




    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content  w-4/5">
                <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className='flex flex-row gap-5'>
                            <div className='w-1/2'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input name='fullName' type="text" placeholder="Name" className="input input-bordered" required />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                                </div>

                            </div>
                            <div className='w-1/2'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Select Account Type</span>
                                    </label>
                                    <select name='accountType' defaultValue='User' className="select select-bordered w-full max-w-xs">
                                        <option>User</option>
                                        <option>Seller</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label justify-start cursor-pointer">
                                <input name='termsAndConditions' type="checkbox" className="checkbox checkbox-primary" required />
                                <span className="label-text ml-2">I accept all the terms and conditions</span>
                            </label>
                        </div>
                        <div className='flex flex-row gap-5'>
                            <div className='w-1/2'>
                                <button type='submit' className="w-full btn btn-primary">Register</button>
                            </div>
                            <div className='w-1/2'>
                                <button onClick={handleGoogleLogin} type='button' className="w-full btn btn-ghost border border-gray-300"><FcGoogle className='text-3xl'></FcGoogle></button>
                            </div>
                        </div>
                        <p className='text-center mt-4 text-sm'>Already have an account? <Link to='/login' className='text-primary'>Login Now</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;