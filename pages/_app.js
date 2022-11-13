import Layout from 'component/Layout/Layout';
import '../styles/globals.scss';

import { AppWrapper } from "../context/AppContext";

function MyApp({ Component, pageProps }) {

  return (
    <>
      <AppWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppWrapper>
    </>
  );
}

export default MyApp;
