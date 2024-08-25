import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (WrappedComponent) => {
  return (props) => {
    return (
      <div>
        <Header />
        <WrappedComponent {...props} />
        <Footer />
      </div>
    );
  };
};

export default Layout;
