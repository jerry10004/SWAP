import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
// import layouts
import ScrollToTop from "layouts/dashboard/ScrollToTop";
import CourseIndex from "components/marketing/pages/courses/course-index/CourseIndex";

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <ScrollToTop />
    //     {/* <AllRoutes /> */}
    //     <CourseIndex />
    //   </div>
    // </Router>
    // <Router>
    //   <div className="App">
    //     <ScrollToTop />
    //     <SwapRoutes />
    //   </div>
    <Routes />
  );
}

export default App;
