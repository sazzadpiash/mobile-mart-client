import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'
import { AuthContextLink } from '../../context/AuthContext/AuthContext';
import { newUser } from '../Register/Register';

const Login = () => {
    const {login, googleLogin } = useContext(AuthContextLink);
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const handleLogin = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        login(email, password)
        .then(data=>{
            // console.log(data)
            if(data?.user?.uid){
                navigate(from, { replace: true })
            }
        })
        .catch(err=>console.log(err))
    }
    const handleGoogleLogin = () => {
        googleLogin()
        .then(result=>{
            const displayName = result.user.displayName;
            const email = result.user.email;
            const accountType = 'User';
            newUser({ displayName, email, accountType })
            navigate(from, { replace: true })
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content w-96">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="text" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <Link className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control ">
                            <button type='submit' className="btn btn-primary">Login</button>
                            <div className="divider text-xs">OR</div>
                            <button onClick={handleGoogleLogin} type='button' className="btn btn-ghost border border-gray-300"><FcGoogle className='text-3xl'></FcGoogle></button>
                            <p className='text-center mt-4 text-sm'>Don't have an account? <br /> <Link to='/register' className='text-primary'>Create a new account</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;