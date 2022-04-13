import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";

const SignUpStudent = (props) => {
  const { name, email, tokenObj } = props;
  const [formData, setFormData] = useState({
    name: name,
    student_id: "",
    phone: "",
    department: "",
    student_class: 1,
    semester: "",
    major1: "",
    major2: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const addUser = async () => {
    var params = new URLSearchParams();
    console.log(formData.semester.toString());
    params.append("name", formData.name);
    params.append("email", email);
    params.append("student_id", formData.student_id);
    params.append("phone", formData.phone);
    params.append("department", formData.department);
    params.append("student_class", formData.student_class.toString());
    params.append("semester", formData.semester.toString());
    params.append("major1", formData.major1);
    params.append("major2", formData.major2);
    params.append("token", tokenObj.id_token);
    params.append("expire", tokenObj.expires_at);
    params.append("status", "0");

    if (window.confirm("학생으로 등록하시겠습니까?")) {
      const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "login/signUp", params);
      alert("학생 회원가입이 완료되었습니다! 다시 로그인 해주시기 바랍니다.");
      navigate("/main");
    }
  };

  return (
    <>
      {/* Form */}
      <Form>
        <Row>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" id="username" placeholder="이름을 입력하세요 " name="name" onChange={handleChange} value={formData.name} required />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>이메일 </Form.Label>
            <Form.Control type="email" id="email" placeholder="이메일을 입력하세요 " value={email} readOnly />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>학번 </Form.Label>
            <Form.Control type="text" id="student_id" name="student_id" placeholder="학번을 입력하세요" onChange={handleChange} required />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>전화 </Form.Label>
            <Form.Control type="tel" id="email" name="phone" placeholder="전화번호를 입력하세요 " onChange={handleChange} required />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>학부</Form.Label>
            <Form.Control type="text" id="department" name="department" placeholder="학부를 입력하세요 " onChange={handleChange} required />
          </Col>
          <Col lg={3} md={3} className="mb-3">
            <Form.Label>학년 </Form.Label>
            <Form.Select aria-label="Default select example" placeholder="학년 " name="student_class" onChange={handleChange} required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Form.Select>
          </Col>
          <Col lg={3} md={3} className="mb-3">
            <Form.Label>학기 </Form.Label>
            <Form.Control type="number" id="semester" name="semester" placeholder="학기" min="1" max="12" onChange={handleChange} required />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>전공 1</Form.Label>
            <Form.Control type="text" id="major1" name="major1" placeholder="1전공을 입력하세요 " onChange={handleChange} required />
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>전공 2</Form.Label>
            <Form.Control type="text" id="major2" name="major2" placeholder="2전공을 입력하세요 " onChange={handleChange} />
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
          <Col lg={12} md={12} className="mb-0 d-grid gap-2 ">
            {/* Button */}
            <Button variant="primary" onClick={addUser}>
              회원가입
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SignUpStudent;
