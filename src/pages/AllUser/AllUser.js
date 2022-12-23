import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllUser = () => {
    
    const { data: sellers = [], refetch } = useQuery({
        queryKey: ['seller'],
        queryFn: async () =>
            fetch(`https://mobile-mart-server-rho.vercel.app/all-user/seller`)
                .then(res => res.json())
    })

    const handleDelete = (email) => {
        fetch(`https://mobile-mart-server-rho.vercel.app/users/${email}`, {
            method: 'DELETE',
        })
        .then(res=>res.json())
        .then(data=>{
            toast.success('Deleted Successfully!')
            console.log(data)
            refetch();
        })
    }

    const verifyHandler = (email) => {
        fetch(`https://mobile-mart-server-rho.vercel.app/verify-user/${email}`, {
            method: 'PUT',
        })
        .then(res=>res.json())
        .then(data=>{
            toast.success('Varified Successfully!')
            console.log(data)
            refetch();
        })
    }
    // console.log(sellers);
    return (
        <div className='p-5'>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Seller Name</th>
                            <th>Seller Email</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            sellers.map(seller => <tr key={seller._id}>
                               
                                <td>
                                    {seller.displayName}
                                </td>
                                <td>
                                    {seller.email}
                                </td>
                                <td>
                                    {
                                        seller.varified ? <span className="badge badge-success">Varified</span> : <span className="badge badge-error">Unvarified</span>
                                    }

                                </td>
                                <th className='text-right'>
                                    <button onClick={()=>verifyHandler(seller.email)} className="btn btn-success mr-3 btn-xs">Varify Seller</button>
                                    <button onClick={()=>handleDelete(seller.email)} className="btn btn-error btn-xs">Delete</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <tr>
                            <th>Seller Name</th>
                            <th>Seller Email</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default AllUser;