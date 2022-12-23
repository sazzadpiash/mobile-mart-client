import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllBuyers = () => {

    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () =>
            fetch(`https://mobile-mart-server-rho.vercel.app/all-user/user`)
                .then(res => res.json())
    })

    const handleDelete = (email) => {
        fetch(`https://mobile-mart-server-rho.vercel.app/users/${email}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Deleted Successfully!')
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
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        {
                            buyers.map(buyer => <tr key={buyer._id}>

                                <td>
                                    {buyer.displayName}
                                </td>
                                <td>
                                    {buyer.email}
                                </td>
                                <th className='text-right'>
                                    <button onClick={() => handleDelete(buyer.email)} className="btn btn-error btn-xs">Delete</button>
                                </th>
                            </tr>)
                        }
                    </tbody>
                    {/* <!-- foot --> */}
                    <tfoot>
                        <tr>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th></th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default AllBuyers;