import SingleProduct from '../../components/SingleProduct';
import { useRouter } from 'next/router';

export default function SingleProductPage() {
    const router = useRouter();

    return <SingleProduct id={router.query.id} />;
}