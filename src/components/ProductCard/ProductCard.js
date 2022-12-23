import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContextLink } from '../../context/AuthContext/AuthContext';
import {AiFillCheckCircle} from 'react-icons/ai'

const ProductCard = ({ singleProduct }) => {
    const {setProductDetails} = useContext(AuthContextLink);
    const { data: seller = [] } = useQuery({
        queryKey: ['userid'],
        queryFn: async () => {
            const response = await fetch(`https://mobile-mart-server-rho.vercel.app/userid/${singleProduct.sellersId}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        }
    })

    return (
        <div className="card lg:card-side shadow-xl bg-violet-50">
            <figure><img src={singleProduct.imgLink} className='w-full lg:w-52 h-full' alt="Album" /></figure>
            <div className="card-body">
                <h2 className="card-title items-end">{singleProduct.productName} <span className='lowercase text-gray-500 text-sm'>condition {singleProduct.condition}</span> </h2>
                <div>
                    <span className='badge badge-primary mr-2'>{singleProduct.address}, {singleProduct.city}</span>
                    <span className='badge badge-ghost'>{seller.displayName}
                    {
                        seller.varified && <AiFillCheckCircle className='text-lg text-info ml-1'></AiFillCheckCircle>
                    }
                    </span>
                </div>

                <p>{singleProduct.description.slice(0, 45)}...</p>

                <div className="flex justify-between items-end">
                    <div>
                        <p>{singleProduct.yearsUse} year of use</p>
                        <p className='text-lg font-bold text-gray-600'>Taka: {singleProduct.sellingPrice} <span className='lowercase font-normal text-gray-500 text-sm'>(Original Price: {singleProduct.officialPrice})</span></p>
                    </div>
                    <label htmlFor="my-modal-form" onClick={()=>setProductDetails(singleProduct)} className="btn">Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;