import NProgress from 'nprogress';
import Page from '../components/Page';
import Router from 'next/router';
import '../Components/styles/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
    return (
        <ApolloProvider client={apollo}>            
            <Page>
                <Component {...pageProps} /> 
            </Page>
        </ApolloProvider>
    );
}

export default withData(MyApp);