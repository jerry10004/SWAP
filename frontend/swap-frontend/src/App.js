// import node module libraries
import { BrowserRouter as Router } from "react-router-dom";

// import layouts
import ScrollToTop from "layouts/dashboard/ScrollToTop";
import AllRoutes from "layouts/AllRoutes";
import CourseIndex from "components/marketing/pages/courses/course-index/CourseIndex";

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        {/* <AllRoutes /> */}
        <CourseIndex />
      </div>
    </Router>
  );
}

export default App;
