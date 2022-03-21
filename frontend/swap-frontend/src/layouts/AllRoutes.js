import { BrowserRouter, Route, Routes } from "react-router-dom";

// ** Import core SCSS styles
import "assets/scss/theme.scss";

/* ----------------------------------- */
/* IMPORTS FOR MARKETING PAGES - START */
import DefaultLayout from "layouts/marketing/DefaultLayout";

import CourseIndex from "components/marketing/pages/courses/course-index/CourseIndex";

/* IMPORTS FOR FRONT SIDE PAGES MENU */
import CourseSingle2 from "components/marketing/pages/courses/course-single2/CourseSingle2";

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

        {/* FRONT SIDE PAGES MENU ROUTERS */}
        <Route exact path="/marketing/courses/course-single2/" layout={<DefaultLayout />} component={<CourseSingle2 />} />

        {/* LANDING PAGES ROUTERS - END */}
        {/* --------------------------- */}
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
