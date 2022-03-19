// import node module libraries
import React, { Fragment } from "react";

// import layouts
// import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
// import Footer from "layouts/marketing/footers/Footer";

const DefaultLayout = (props) => {
  return (
    <Fragment>
      {/* <NavbarDefault login /> */}
      {props.children}
      {/* <Footer /> */}
    </Fragment>
  );
};

export default DefaultLayout;
