import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContextLink } from '../../context/AuthContext/AuthContext';

const AddProduct = () => {
    const {user} = useContext(AuthContextLink);
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () =>
            fetch('https://mobile-mart-server-rho.vercel.app/categories')
                .then(res => res.json())
    })
    const { data: usersDetails = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () =>
            fetch(`https://mobile-mart-server-rho.vercel.app/users/${user.email}`)
                .then(res => res.json())
    })
    // console.log(categories)
    const handleProductUpload = (event) => {
        event.preventDefault();
        const productName = event.target.productName.value;
        const sellingPrice = event.target.sellingPrice.value;
        const phone = event.target.phone.value;
        const condition = event.target.condition.value;
        const categoryId = event.target.categorie.value;
        const city = event.target.city.value;
        const address = event.target.address.value;
        const officialPrice = event.target.officialPrice.value;
        const yearsUse = event.target.yearsUse.value;
        const image = event.target.image.files[0];
        const description = event.target.description.value;
        const sellersId = usersDetails._id;
        const availableStatus = true;
        const promoted = false;

        // console.log(image.files[0])
        const formData = new FormData();
        formData.append('image', image);
        toast.promise(
            fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API}`, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(imgData => {
                    const imgLink = imgData.data.url;
                    const productDetails = { productName, sellingPrice, phone, condition, categoryId, city, address, officialPrice, yearsUse, imgLink, description, sellersId, availableStatus, promoted};
                    fetch('https://mobile-mart-server-rho.vercel.app/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(productDetails)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            event.target.reset()
                        })
                }),
            {
                loading: 'Loading...',
                success: 'Product Uploaded',
                error: (err) => err.response.data.msg,
            }
        );
    }
    return (
        <div className="bg-violet-100 m-5 p-5 rounded-lg">
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h2 className='text-4xl font-bold'>Add Products</h2>
                            <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <form onSubmit={handleProductUpload}>
                            <div className="overflow-hidden shadow sm:rounded-md">
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="product-name" className="block text-sm mb-2 font-medium text-gray-700">
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                name="productName"
                                                id="product-name"
                                                placeholder='Exe: Iphone 13 Pro Max'
                                                className="input input-bordered w-full border-violet-400 border-2"
                                                required
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="product-price" className="block text-sm mb-2 font-medium text-gray-700">
                                                Selling Price
                                            </label>
                                            <input
                                                type="text"
                                                name="sellingPrice"
                                                id="product-price"
                                                placeholder='Exe: 98000'
                                                className="input input-bordered w-full border-violet-400 border-2"
                                                required
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="condition" className="block text-sm mb-2 font-medium text-gray-700">
                                                Product Condition
                                            </label>
                                            <select id='condition' name='condition' defaultValue='User' className="select select-bordered border-violet-400 border-2 w-full" required>
                                                <option defaultValue disabled >Select an option</option>
                                                <option>Excellent</option>
                                                <option>Good</option>
                                                <option>Fair</option>
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="categorie" className="block text-sm mb-2 font-medium text-gray-700">
                                                Product Categorie
                                            </label>
                                            <select id='categorie' name='categorie' defaultValue='User' className="select select-bordered border-violet-400 border-2 w-full" required>
                                                <option disabled defaultValue>Select an option</option>
                                                {
                                                    categories.map(singleCategory => <option 
                                                        value={singleCategory._id}
                                                        key={singleCategory._id}>
                                                        {singleCategory.category_name}
                                                    </option>)
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm mb-2 font-medium text-gray-700">
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                placeholder='Exe: 98000'
                                                className="input input-bordered w-full border-violet-400 border-2"
                                                required
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 ">
                                            <label htmlFor="city" className="block text-sm mb-2 font-medium text-gray-700">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                placeholder='Exe: Dhaka'
                                                className="input input-bordered w-full border-violet-400 border-2"
                                                required
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="address" className="block text-sm mb-2 font-medium text-gray-700">
                                                Address
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                id="address"
                                                placeholder='Exe: 258/A, West Ramgonj'
                                                className="input input-bordered w-full border-violet-400 border-2"
                                                required
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="new-price" className="block text-sm mb-2 font-medium text-gray-700">
                                                Product's Official Price
                                            </label>
                                            <input
                                                type="text"
                                                name="officialPrice"
                                                id="new-price"
                                                placeholder='Exe: 137000'
                                                className="input input-bordered w-full border-violet-400 border-2"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="years-of-use" className="block text-sm mb-2 font-medium text-gray-700">
                                                Years of use
                                            </label>
                                            <input
                                                type="text"
                                                name="yearsUse"
                                                id="years-of-use"
                                                placeholder='Exe: 1'
                                                className="input input-bordered w-full border-violet-400 border-2"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="image" className="block text-sm mb-2 font-medium text-gray-700">
                                                Product's Recent Image
                                            </label>
                                            <input type="file" id='image' name='image' className="file-input file-input-bordered w-full border-violet-400 border-2 file-input-primary" required />
                                        </div>
                                        <div className="col-span-6">
                                            <label htmlFor="description" className="block text-sm mb-2 font-medium text-gray-700">
                                                Years of use
                                            </label>
                                            <textarea id='description' name='description' className="textarea textarea-bordered border-violet-400 border-2 h-20 lg:h-24 w-full" placeholder="Description" required></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;