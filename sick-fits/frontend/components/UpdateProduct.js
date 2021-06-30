import gql from 'graphql-tag';
import Form from './styles/Form';
import { useQuery, useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

const UPDATE_PRODUCT_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!){
        Product(where: {id: $id}) {
            id
            name
            description
            price
        }
    }
`;

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION(
        $id: ID!,
        $name: String,
        $description: String,
        $price: Int
    ) {
        updateProduct(
            id: $id,
            data: {
                name: $name,
                description: $description,
                price: $price
            }
        ) {
            id
            name
            description
            price
        }
    }
`;

export default function UpdateProduct({ id }) {
    const { data, loading, error } = useQuery(UPDATE_PRODUCT_QUERY, {
        variables: {
            id
        }
    });
    const [
        updateProduct, 
        { data: updateData, loading: updateLoading, error: updateError },
    ] = useMutation(UPDATE_PRODUCT_MUTATION);
    const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);
    if (loading) return <p>loading...</p>;
    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            const res = await updateProduct({
                variables: {
                    id,
                    name: inputs.name,
                    description: inputs.description,
                    price: inputs.price,
                },
            });
            // clearForm();
            // Router.push({
            //     pathName: `/product/${res.data.createProduct.idn}`
            // })
        }}>
            <DisplayError error={error || updateError}/>
            <fieldset disabled={updateLoading} aria-busy={updateLoading}>
                <label htmlFor="name">
                    Name
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="price">
                    Price
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        value={inputs.price}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="description">
                    Description
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Update Product</button>
            </fieldset>
        </Form>
    );
}