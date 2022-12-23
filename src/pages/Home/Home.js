import React, { useContext } from 'react';
import { AiOutlineGlobal } from 'react-icons/ai';
import { TbArrowsLeftRight } from 'react-icons/tb';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { AuthContextLink } from '../../context/AuthContext/AuthContext';
import BookingModal from '../../components/BookingModal/BookingModal';
// import "./styles.css";

const Home = () => {
    const { productDetails, setProductDetails } = useContext(AuthContextLink);

    const { data: promotedProducts = [] } = useQuery({
        queryKey: ['promoted-products'],
        queryFn: async () =>
            fetch('https://mobile-mart-server-rho.vercel.app/promoted-products')
                .then(res => res.json())
    })
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () =>
            fetch('https://mobile-mart-server-rho.vercel.app/categories')
                .then(res => res.json())
    })
    return (
        <div>
            {/* Banner */}
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    <SwiperSlide><img src="https://static.gadgetandgear.com/tmp/slider/20221109_1667973871_137564.png" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="https://static.gadgetandgear.com/tmp/slider/20221014_1665721412_116633.png" alt="" /></SwiperSlide>
                </Swiper>
            </div>
            {/* Items */}
            <div className='grid grid-cols-3 gap-10 max-w-7xl mx-auto py-20 bg-white'>
                {
                    promotedProducts.length > 0 && promotedProducts.map(promotedProduct => <div key={promotedProduct._id}>

                        <div className="card bg-base-100 shadow-xl">
                            <figure><img src={promotedProduct.imgLink} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">
                                    {promotedProduct.productName}
                                    <div className="badge badge-secondary">Promoted</div>
                                </h2>
                                <h2 className='card-title'>{promotedProduct.sellingPrice} Taka</h2>
                                <p>{promotedProduct.description.slice(0, 45)}...</p>
                                <button className='btn btn-primary'> Buy Now</button>
                            </div>
                        </div>

                    </div>)
                }
                {
                    productDetails &&
                    <BookingModal></BookingModal>
                }
            </div>

            <h1 className='text-4xl text-center mb-5 font-bold'>Categories</h1>
            <div className='grid grid-cols-3 gap-10 max-w-7xl mx-auto pb-20 bg-white'>

                {
                    categories.map(singleCategory => <Link to={`/category/${singleCategory._id}`} className="card bg-base-100 shadow-xl" key={singleCategory._id}>
                        <figure><img src={singleCategory.cat_img} alt={singleCategory.category_name} /></figure>
                        <div className="card-body items-center">
                            <h2 className="card-title text-2xl uppercase">
                                {singleCategory.category_name}
                            </h2>
                        </div>
                    </Link>)
                }

                {/* <div className="card bg-base-100 shadow-xl" key={singleCategory._id}>
                    <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {singleCategory.category_name}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Fashion</div>
                            <div className="badge badge-outline">Products</div>
                        </div>
                    </div>
                </div> */}

            </div>
            {/* Extra Section */}
            <div className='py-24 bg-orange-50'>
                <h2 className='text-center text-3xl font-bold'>What is Mobile Mart?</h2>
                <div className='max-w-7xl grid grid-cols-3 gap-10 mx-auto mt-5'>
                    <div>
                        <AiOutlineGlobal className='text-6xl text-secondary mb-2'></AiOutlineGlobal>
                        <h3 className='text-2xl font-bold mb-2'>A community of owners, investors, creators and makers</h3>
                        <p>Mobile Mart is a global online marketplace where individuals and business owners buy and sell Mobile Phones.</p>
                    </div>
                    <div>
                        <TbArrowsLeftRight className='text-6xl text-blue-600  mb-2'></TbArrowsLeftRight>
                        <h3 className='text-2xl font-bold mb-2'>A Buy and Sell Plartform</h3>
                        <p>People can come here and sell there mobile phone or buy a new one.</p>
                    </div>
                    <div>
                        <BsFillShieldLockFill className='text-6xl text-violet-600  mb-2'></BsFillShieldLockFill>
                        <h3 className='text-2xl font-bold mb-2'>A secure market for all</h3>
                        <p>Mobile Mart is a secure marketplace for all.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;