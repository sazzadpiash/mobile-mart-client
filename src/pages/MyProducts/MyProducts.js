import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContextLink } from '../../context/AuthContext/AuthContext';

const MyProducts = () => {
    const { user } = useContext(AuthContextLink);
    const { data: userDetails = {} } = useQuery({
        queryKey: ['users'],
        queryFn: async () =>
            fetch(`https://mobile-mart-server-rho.vercel.app/users/${user?.email}`)
                .then(res => res.json())
    })
    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ['users', userDetails],
        queryFn: async () =>
            fetch(`https://mobile-mart-server-rho.vercel.app/my-products/${userDetails?._id}`)
                .then(res => res.json())
    })

    const handleDelete = (id) => {
        fetch(`https://mobile-mart-server-rho.vercel.app/my-products/${id}`, {
            method: 'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            refetch();
        })
    }

    const promoteHandler = (id) => {
        fetch(`https://mobile-mart-server-rho.vercel.app/promote/${id}`, {
            method: 'PUT',
        })
        .then(res=>res.json())
        .then(data=>{
            toast.success('Promoted Successfully!')
            console.log(data)
            refetch();
        })
    }

    // useEffect(() => {
    //     fetch(`https://mobile-mart-server-rho.vercel.app/my-products/${userDetails?._id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log('products has been set')
    //             return setMyProducts(data)
    //         })
    // }, [userDetails])

    console.log(Array.isArray(myProducts));
    return (
        <div className='p-5'>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            myProducts.map(myProduct => <tr key={myProduct._id}>
                                {
                                    console.log('map is running')
                                }
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={myProduct?.imgLink} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{myProduct?.productName}</div>
                                            <div className="text-sm opacity-50">{myProduct.address}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {myProduct.condition}
                                </td>
                                <td>{myProduct.sellingPrice} Taka</td>
                                <td>
                                    {
                                        myProduct.availableStatus ? <span className="badge badge-success">Available</span> : <span className="badge badge-error">Sold</span>
                                    }

                                </td>
                                <th className='text-right'>
                                    <button onClick={()=>promoteHandler(myProduct._id)} className="btn btn-warning mr-3 btn-xs">Promote</button>
                                    <button onClick={()=>handleDelete(myProduct._id)} className="btn btn-error btn-xs">Delete</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default MyProducts;