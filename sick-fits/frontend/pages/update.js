import UpdateProduct from '../components/UpdateProduct';
import { useRouter } from 'next/router';

export default function UpdatePage() {
  const router = useRouter();
  return (
    <div>
      <UpdateProduct id={router.query.id} />
    </div>
  );
}
