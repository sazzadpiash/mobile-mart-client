import React, { createContext, useEffect, useState } from 'react';
import { app } from '../../firebase/firebase.cofig';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'

export const AuthContextLink = createContext()
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

const AuthContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] =useState(true);
    // console.log(user)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const profileUpdate = profileDetails => {
        return updateProfile(auth.currentUser, profileDetails)
    };
    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        setLoading(true)
        setUserRole(null)
        return signOut(auth);
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    },[])

    const authData = {
        setUser,
        createUser,
        profileUpdate,
        user,
        logOut,
        login,
        googleLogin, 
        userRole,
        setUserRole,
        loading,
        setProductDetails,
        productDetails
    };
    return (
        <div>
            <AuthContextLink.Provider value={authData}>
                {children}
            </AuthContextLink.Provider>
        </div>
    );
};

export default AuthContext;