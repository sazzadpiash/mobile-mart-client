import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import BookingModal from '../../components/BookingModal/BookingModal';
import ProductCard from '../../components/ProductCard/ProductCard';
import { AuthContextLink } from '../../context/AuthContext/AuthContext';

const Category = () => {
    const {productDetails} = useContext(AuthContextLink);
    const { id } = useParams();
    const { data: products = [] } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const response = await fetch(`https://mobile-mart-server-rho.vercel.app/category/${id}`)
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        }
    })
    return (
        <div className='2xl:px-32 mx-auto grid grid-cols-2 gap-8 py-24'>
            {
                products.map(singleProduct => <ProductCard key={singleProduct._id} singleProduct={singleProduct}></ProductCard>)
            }
            {
                productDetails &&
                <BookingModal></BookingModal>
            }
        </div>
    );
};

export default Category;