import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Import core SCSS styles
import "assets/scss/theme.scss";

/* ----------------------------------- */
/* IMPORTS FOR MARKETING PAGES - START */
import DefaultLayout from "layouts/marketing/DefaultLayout";

import CourseIndex from "components/marketing/pages/courses/course-index/CourseIndex";

/* IMPORTS FOR MARKETING PAGES - END */
/* --------------------------------- */

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props}></Component>
      </Layout>
    )}
  ></Route>
);

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --------------------------- */}
        {/* LANDING PAGES ROUTERS - START */}
        <Route exact path="/" layout={<DefaultLayout />} component={<CourseIndex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
