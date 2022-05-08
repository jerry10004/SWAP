import React, { useState } from "react";
import Select from "react-select";
import BaseSelect from "react-select";
import FixRequiredSelect from "./FixedRequiredSelect";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import data from "./data.json";

const SignUpStudent = (props) => {
  const [dep, setdepartment] = useState(null);
  const [Major, setMajor] = useState(null);
  const [Major2, setMajor2] = useState(null);
  const [MajorList, setMajorList] = useState([]);

  //const Select = (props) => <FixRequiredSelect {...props} SelectComponent={BaseSelect} options={data} />;

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 48.4,
      border: "1px solid #e8e7ed",
    }),
  };

  const handledepartmentChange = (obj) => {
    setdepartment(obj);
    setMajorList(obj.majors);
    setMajor(null);
    setFormData((prevState) => ({
      ...prevState,
      department: obj.department,
    }));
  };

  const handleMajorChange = (obj) => {
    setMajor(obj);
    setFormData({
      ...formData,
      major1: obj.name,
    });
  };

  const handleMajor2Change = (obj) => {
    setMajor2(obj);
    setFormData({
      ...formData,
      major2: obj.name,
    });
  };

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

  const major2 = [
    { value: "무전공", name: "무전공", department: "글로벌리더십학부" },
    { value: "국제지역학전공", name: "국제지역학전공", department: "국제어문학부" },
    { value: "영어전공", name: "영어전공", department: "국제어문학부" },
    { value: "경영학전공", name: "경영학전공", department: "경영경제학부" },
    { value: "경제학전공", name: "경제학전공", department: "경영경제학부" },
    { value: "GM전공", name: "GM전공", department: "경영경제학부" },
    { value: "한국법전공", name: "한국법전공", department: "법학부" },
    { value: "U.S.& International Law 전공", name: "U.S.& International Law 전공", department: "법학부" },
    { value: "공연영상학전공", name: "공연영상학전공", department: "커뮤니케이션학부" },
    { value: "언론정보학전공", name: "언론정보학전공", department: "커뮤니케이션학부" },
    { value: "건설공학전공", name: "건설공학전공", department: "공간환경시스템공학부" },
    { value: "도시환경공학전공", name: "도시환경공학전공", department: "공간환경시스템공학부" },
    { value: "기계공학전공", name: "기계공학전공", department: "기계제어공학부" },
    { value: "전자제어공학전공", name: "전자제어공학전공", department: "기계제어공학부" },
    { value: "시각디자인전공", name: "시각디자인전공", department: "콘텐츠융합디자인학부" },
    { value: "제품디자인전공", name: "제품디자인전공", department: "콘텐츠융합디자인학부" },
    { value: "생명과학전공", name: "생명과학전공", department: "생명과학부" },
    { value: "컴퓨터공학전공", name: "컴퓨터공학전공", department: "전산전자공학부" },
    { value: "전자공학전공", name: "전자공학전공", department: "전산전자공학부" },
    { value: "컴퓨터공학심화전공", name: "컴퓨터공학심화전공", department: "전산전자공학부" },
    { value: "전자공학심화전공", name: "전자공학심화전공", department: "전산전자공학부" },
    { value: "IT전공", name: "IT전공", department: "전산전자공학부" },
    { value: "상담심리학전공", name: "상담심리학전공", department: "상담심리사회복지학부" },
    { value: "사회복지학전공", name: "사회복지학전공", department: "상담심리사회복지학부" },
    { value: "ICT창업전공", name: "ICT창업전공", department: "ICT창업학부" },
    { value: "GE(국제적 기업가정신) 전공", name: "GE(국제적 기업가정신) 전공", department: "ICT창업학부" },
    { value: "ICT융합전공", name: "ICT융합전공", department: "ICT창업학부" },
    { value: "학생설계융합전공", name: "학생설계융합전공", department: "창의융합교육원" },
    { value: "글로벌융합전공", name: "글로벌융합전공", department: "창의융합교육원" },
    { value: "글로벌한국학전공", name: "글로벌한국학전공", department: "창의융합교육원" },
    { value: "수학통계전공", name: "수학통계전공", department: "창의융합교육원" },
    { value: "AI융합전공", name: "AI융합전공", department: "AI융합교육원" },
  ];

  const addUser = async (e) => {
    e.preventDefault();
    var params = new URLSearchParams();
    console.log("************", formData);

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
    params.append("status", "1");

    if (window.confirm("학생으로 등록하시겠습니까?")) {
      const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "login/signUp", params);
      alert("학생 회원가입이 완료되었습니다! 다시 로그인 해주시기 바랍니다.");
      navigate("/main");
    }
  };

  return (
    <>
      {/* Form */}
      <Form onSubmit={addUser}>
        <Row>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" id="username" placeholder="이름을 입력하세요 " name="name" onChange={handleChange} required />
            <span className="fs-6"> *실명을 입력해주세요.</span>
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
            <Select
              required
              styles={customStyles}
              placeholder="학부를 선택하세요"
              value={dep}
              options={data}
              onChange={handledepartmentChange}
              getOptionLabel={(x) => x.department}
              getOptionValue={(x) => x.department}
            />
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
            <Select
              required
              styles={customStyles}
              placeholder="학부를 선택하세요"
              value={Major}
              options={MajorList}
              onChange={handleMajorChange}
              getOptionLabel={(x) => x.name}
              getOptionValue={(x) => x.name}
            />
            {/* <Form.Control type="text" id="major1" name="major1" placeholder="1전공을 입력하세요 " onChange={handleChange} required /> */}
          </Col>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>전공 2</Form.Label>
            <Select
              styles={customStyles}
              placeholder="2전공을 선택하세요"
              value={Major2}
              options={major2}
              getOptionLabel={(x) => x.value}
              getOptionValue={(x) => x.value}
              onChange={handleMajor2Change}
            />
            {/* <Form.Control type="text" id="major2" name="major2" placeholder="2전공을 입력하세요 " onChange={handleChange} /> */}
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
            <Button variant="primary" type="submit">
              회원가입
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default SignUpStudent;
