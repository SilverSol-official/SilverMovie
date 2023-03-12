import Footer from "../Footer.tsx";
import Header from "../Header.tsx";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
