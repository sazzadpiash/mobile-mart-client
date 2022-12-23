import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const NoRoutepage = () => {
    return (
        <div>
            <Header></Header>
            <div className='max-w-7xl mx-auto'>
                <img className='w-96 m-auto my-28' src="https://i.ibb.co/v1NYQxv/oops-404-error-with-broken-robot-concept-illustration-114360-1932.webp" alt="" />
            </div>
            <Footer></Footer>
        </div>
    );
};

export default NoRoutepage;