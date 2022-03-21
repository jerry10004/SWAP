// Section : Hero Header
// Style : Welcome Text on left and image on right

// import node module libraries
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import media files
import HeroImage from "assets/images/Main.png";

const HeroHeader = () => {
  return (
    <div className="bg-primary">
      <Container>
        {/*  Hero Section  */}
        <Row className="align-items-center g-0">
          <Col xl={5} lg={6} md={12}>
            <div className="py-5 py-lg-0">
              <h1 className="text-white display-4 fw-bold">Software Activities and Programs</h1>
              <p className="text-white-50 mb-4 lead">소프트웨어 전공자를 위한 비교과 통합 관리 시스템</p>
              <Link to="/marketing/courses/course-filter-page/" className="btn btn-success">
                프로그램 보러 가기
              </Link>{" "}
              {/* <Link to="/authentication/sign-in/" className="btn btn-white">
                프로그램 보러 가기
              </Link> */}
            </div>
          </Col>
          <Col xl={7} lg={6} md={12} className="text-lg-end text-center">
            <Image src={HeroImage} alt="" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default HeroHeader;
