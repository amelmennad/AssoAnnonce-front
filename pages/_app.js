import Layout from 'component/Layout/Layout';
import '../styles/globals.scss';
import '../styles/bootstrapCutomColor.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
