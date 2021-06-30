import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Error from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
    const { inputs, handleChange, resetForm} = useForm({
        email: '',
        name: '',
        password: '',
    });
    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
        variables: inputs,
        // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await signup().catch(console.error);
        resetForm();
    }
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <Error error={error} />
            <fieldset>
                {data?.createUser && <p>Signed up with {data.createUser.email} - please sign in!</p>}
                <label htmlFor="email">
                    email
                    <input 
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    your name
                    <input 
                        type="text"
                        name="name"
                        placeholder="Your name"
                        autoComplete="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    password
                    <input 
                        type="password"
                        name="password"
                        placeholder="Your password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign in</button>
            </fieldset>
        </Form>
    );
}