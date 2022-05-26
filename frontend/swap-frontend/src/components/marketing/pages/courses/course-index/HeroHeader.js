// Section : Hero Header
// Style : Welcome Text on left and image on right

// import node module libraries
import { Col, Row, Container, Image, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

// import media files
import HeroImage from "assets/images/Main.png";

const HeroHeader = () => {
  const navigate = useNavigate();
  const checkApply = async () => {
    if (window.sessionStorage.getItem("id") === null) {
      alert("로그인이 필요한 항목입니다. 로그인을 진행해 주세요.");
    } else {
      navigate("/swap/mypage");
    }
  };

  return (
    <div className="bg-primary">
      <Container>
        {/*  Hero Section  */}
        <Row className="align-items-center g-0">
          <Col xl={5} lg={6} md={12}>
            <div className="py-5 py-lg-0">
              <h1 className="text-white display-4 fw-bold">Software Activities and Programs</h1>
              <p className="text-white-50 mb-4 lead">소프트웨어 전공자를 위한 비교과 통합 관리 시스템</p>
              <Button className="btn btn-success" onClick={checkApply}>
                내 활동내역 보러가기
              </Button>
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
