import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";

const SignUpAdmin = (props) => {
  const { name, email, tokenObj } = props;
  const [formData, setFormData] = useState({
    phone: "",
    department: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const addUser = async (e) => {
    e.preventDefault();
    var params = new URLSearchParams();

    params.append("name", name);
    params.append("email", email);
    params.append("department", formData.department);
    params.append("phone", formData.phone);
    params.append("token", tokenObj.id_token);
    params.append("expire", tokenObj.expires_at);
    console.log("!!!token:  ", tokenObj.id_token);
    console.log("!!!expire:  ", tokenObj.expires_at);

    params.append("status", "2");

    if (window.confirm("관리자로 등록하시겠습니까?")) {
      const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "login/signUp", params);
      alert("관리자 회원가입이 완료되었습니다!\n관리자로 승인이 되기 전까지 일반 사용자로 로그인 됩니다.\n다시 로그인 해주시기 바랍니다.");
      navigate("/swap/main");
    }
  };
  return (
    <>
      <Form onSubmit={addUser}>
        <Row>
          <Col lg={12} md={12} className="mb-3">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" id="username" placeholder="이름을 입력하세요 " value={name} required />
          </Col>
          <Col lg={12} md={12} className="mb-3">
            <Form.Label>이메일 </Form.Label>
            <Form.Control type="email" id="email" placeholder="이메일을 입력하세요 " value={email} readOnly />
          </Col>

          <Col lg={12} md={12} className="mb-3">
            <Form.Label>전화 </Form.Label>
            <Form.Control type="tel" id="email" placeholder="전화번호를 입력하세요 " name="phone" onChange={handleChange} required />
          </Col>

          <Col lg={12} md={12} className="mb-3">
            <Form.Label>소속 </Form.Label>
            <Form.Control type="text" id="department" placeholder="소속을 입력하세요 " name="department" onChange={handleChange} required />
          </Col>

          <Col lg={12} md={12} className="mb-3 mt-13">
            <Form.Check type="checkbox" id="check-api-checkbox">
              <Form.Check.Input type="checkbox" required />
              <Form.Check.Label>
                <Link to="/swap/terms-and-conditions">서비스 이용약관 </Link> 및 <Link to="/swap/personal-information">개인정보취급방침</Link>
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

export default SignUpAdmin;
