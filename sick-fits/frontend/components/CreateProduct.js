import { useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload
    ) {
        createProduct(
            data: {
                name: $namne
                description: $descriptionb
                price: $price
                status: "AVAILABLE"
                photo: { create: { image: $image, altText: $name } }
            }
        ) {
            id
            price
            description
            name
            photo
        }
    }
`;


export default function CreateProduct() {
    const { inputs, handleChange, clearForm, resetForm } = useForm({
        image: '',
        name: '',
        price: 0,
        description: '',
    });
    const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, { variables: inputs });
    return (
        <Form onSubmit={async (e) => {
            e.preventDefault();
            const res = await createProduct();
            clearForm();
        }}>
            <DisplayError error={error}/>
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="image">
                    Image
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleChange}
                        required
                    />
                </label>
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
                <button type="submit">+ Add Product</button>
            </fieldset>
        </Form>
    );
}