import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContextLink } from '../../context/AuthContext/AuthContext';

const BookingModal = () => {
    const {user, productDetails, setProductDetails} = useContext(AuthContextLink);
    if(!user){
        return 'Loading...'
    }

    const productId = productDetails?._id;
    const productName = productDetails?.productName;
    const sellerId = productDetails?.sellersId;
    const buyerEmail = user?.email;
    const buyerName = user?.displayName;

    const handleModalForm = (event) => {
        event.preventDefault();
        const buyerPhone = event.target.buyerPhone.value;
        const meetingLocation = event.target.meetingLocation.value;

        const bookData = {productName, productId, sellerId, buyerName, buyerEmail, buyerPhone, meetingLocation}

        console.log(bookData);

        fetch('https://mobile-mart-server-rho.vercel.app/book-now', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookData)
        })
        .then(res=>res.json())
        .then(data=>{
            setProductDetails(null)
            toast.success('Booked Successfully')
        })

    }
    return (
        <div>
            <input type="checkbox" id="my-modal-form" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-form" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleModalForm}>
                        <div className="form-control w-full mt-3">
                            <label htmlFor='userName' className="label">
                                <span>Name:</span>
                            </label>
                            <input type="text" value={user?.displayName} disabled placeholder="Type here" id='userName' className="input input-bordered w-full" />
                            <label htmlFor='userEmail' className="label">
                                <span>Email:</span>
                            </label>
                            <input type="text" value={user?.email} disabled placeholder="Type here" id='userEmail' className="input input-bordered w-full" />
                            <label htmlFor='itemName' className="label">
                                <span>Product Name:</span>
                            </label>
                            <input type="text" value={productDetails?.productName} disabled placeholder="Type here" id='itemName' className="input input-bordered w-full" />
                            <label htmlFor='itemPrice' className="label">
                                <span>Product Price:</span>
                            </label>
                            <input type="text" value={productDetails?.sellingPrice} disabled placeholder="Type here" id='itemPrice' className="input input-bordered w-full" />
                            <label htmlFor='phoneNumber' className="label">
                                <span>Phone:</span>
                            </label>
                            <input name='buyerPhone' type="text" placeholder="Type here" id='phoneNumber' className="input input-bordered w-full" required />
                            <label htmlFor='meetLocation' className="label">
                                <span>Meeting Location:</span>
                            </label>
                            <input name='meetingLocation' type="text" placeholder="Type here" id='meetLocation' className="input input-bordered w-full" required />
                        </div>
                        <div className='text-right'>
                            <button type='submit' className='btn btn-primary mt-4'>Book Now</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default BookingModal;