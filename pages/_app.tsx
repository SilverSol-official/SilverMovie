// import "../styles/globals";
import "bootstrap/dist/css/bootstrap.css";
import Layout from "../Components/Layout/Layout";
import { Provider } from "react-redux";
import { store } from "../rdx/Store/store";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }:AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
