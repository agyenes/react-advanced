import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { useMutation } from '@apollo/client';
import Error from './ErrorMessage';

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
                item {
                    id
                    email
                    name
                }
            }
            ... on UserAuthenticationWithPasswordFailure {
                item {
                    code
                    message
                }
            }
        }
    }
`;

export default function SignIn() {
    const { inputs, handleChange, resetForm} = useForm({
        email: '',
        password: '',
    });
    const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    });
    const error = data?.authenticateUserWithPassword.__typeName === "UserAuthenticationWithPasswordFailure" ?
        data?.authenticateUserWithPassword : undefined;
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await signin();
        resetForm();
    }
    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <Error error={error} />
            <fieldset>
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