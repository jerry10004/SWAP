import Routes from "./Routes";
<<<<<<< HEAD

function App() {
  return <Routes />;
=======
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
>>>>>>> e86c23bc755aba24783f620aa0e6cac8e7b64dbd
}

export default App;
