// import node module libraries
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";

// import media files
import Logo from "assets/images/OnlyLogo.png";

const SignUp = () => {
  const [registerForm, setRegisterForm] = useState("student");
  const onChangeValue = (event) => {
    console.log(event.target.value);
    setRegisterForm(event.target.value);
  };

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4 ">
                <Link to="/">
                  <Image src={Logo} width="50px" className="mb-4" alt="" />
                </Link>
                <h1 className="mb-1 fw-bold">Sign Up</h1>
              </div>
              <div onChange={onChangeValue}>
                <input type="radio" value="student" name="gender" defaultChecked /> 학생으로 등록
                <input type="radio" value="teacher" name="gender" /> 선생님으로 등록
              </div>
              {registerForm === "student" ? <StudentCard /> : null}

              {/*      
              <Form>
                <Row>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" id="username" placeholder="이름을 입력하세요 " value="정수산나" readOnly />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>이메일 </Form.Label>
                    <Form.Control type="email" id="email" placeholder="이메일을 입력하세요 " value="sanna422@handong.ac.kr" readOnly />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>학번 </Form.Label>
                    <Form.Control type="text" id="student_id" placeholder="학번을 입력하세요" required />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>전화 </Form.Label>
                    <Form.Control type="tel" id="email" placeholder="전화번호를 입력하세요 " required />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>학부</Form.Label>
                    <Form.Control type="text" id="department" placeholder="학부를 입력하세요 " required />
                  </Col>
                  <Col lg={3} md={3} className="mb-3">
                    <Form.Label>학년 </Form.Label>
                    <Form.Select aria-label="Default select example" placeholder="학년 " required>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </Form.Select>
                  </Col>
                  <Col lg={3} md={3} className="mb-3">
                    <Form.Label>학기 </Form.Label>
                    <Form.Control type="number" id="semester" placeholder="학기" min="1" max="12" required />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>전공 1</Form.Label>
                    <Form.Control type="text" id="major1" placeholder="1전공을 입력하세요 " required />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>전공 2</Form.Label>
                    <Form.Control type="text" id="major2" placeholder="2전공을 입력하세요 " />
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Check type="checkbox" id="check-api-checkbox">
                      <Form.Check.Input type="checkbox" required />
                      <Form.Check.Label>
                        <Link to="/pages/terms-and-conditions">서비스 이용약관 </Link> 및 <Link to="/pages/terms-and-conditions">개인정보취급방침</Link>
                        동의
                      </Form.Check.Label>
                    </Form.Check>
                  </Col>
                  <Col lg={12} md={12} className="mb-0 d-grid gap-2">
       
                    <Button variant="primary" type="submit">
                      회원가입
                    </Button>
                  </Col>
                </Row>
              </Form> */}
              <hr className="my-4" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

const StudentCard = () => {
  return (
    <>
      {" "}
      {/* Form */}
      <Form>
        <Row>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" id="username" placeholder="이름을 입력하세요 " value="정수산나" readOnly />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>이메일 </Form.Label>
            <Form.Control type="email" id="email" placeholder="이메일을 입력하세요 " value="sanna422@handong.ac.kr" readOnly />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>학번 </Form.Label>
            <Form.Control type="text" id="student_id" placeholder="학번을 입력하세요" required />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>전화 </Form.Label>
            <Form.Control type="tel" id="email" placeholder="전화번호를 입력하세요 " required />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>학부</Form.Label>
            <Form.Control type="text" id="department" placeholder="학부를 입력하세요 " required />
          </Col>
          <Col lg={3} md={3} className="mb-3">
            <Form.Label>학년 </Form.Label>
            <Form.Select aria-label="Default select example" placeholder="학년 " required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Form.Select>
          </Col>
          <Col lg={3} md={3} className="mb-3">
            <Form.Label>학기 </Form.Label>
            <Form.Control type="number" id="semester" placeholder="학기" min="1" max="12" required />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>전공 1</Form.Label>
            <Form.Control type="text" id="major1" placeholder="1전공을 입력하세요 " required />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>전공 2</Form.Label>
            <Form.Control type="text" id="major2" placeholder="2전공을 입력하세요 " />
          </Col>
          <Col lg={12} md={12} className="mb-3">
            <Form.Check type="checkbox" id="check-api-checkbox">
              <Form.Check.Input type="checkbox" required />
              <Form.Check.Label>
                <Link to="/pages/terms-and-conditions">서비스 이용약관 </Link> 및 <Link to="/pages/terms-and-conditions">개인정보취급방침</Link>
                동의
              </Form.Check.Label>
            </Form.Check>
          </Col>
          <Col lg={12} md={12} className="mb-0 d-grid gap-2">
            {/* Button */}
            <Button variant="primary" type="submit">
              회원가입
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SignUp;
