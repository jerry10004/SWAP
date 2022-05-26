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
    { value: "국제지역학", name: "국제지역학", department: "국제어문학부" },
    { value: "영어", name: "영어", department: "국제어문학부" },
    { value: "경영학", name: "경영학", department: "경영경제학부" },
    { value: "경제학", name: "경제학", department: "경영경제학부" },
    { value: "GM", name: "GM", department: "경영경제학부" },
    { value: "한국법", name: "한국법", department: "법학부" },
    { value: "U.S.& International Law", name: "U.S.& International Law", department: "법학부" },
    { value: "공연영상학", name: "공연영상학", department: "커뮤니케이션학부" },
    { value: "언론정보학", name: "언론정보학", department: "커뮤니케이션학부" },
    { value: "건설공학", name: "건설공학", department: "공간환경시스템공학부" },
    { value: "도시환경공학", name: "도시환경공학", department: "공간환경시스템공학부" },
    { value: "기계공학", name: "기계공학", department: "기계제어공학부" },
    { value: "전자제어공학", name: "전자제어공학", department: "기계제어공학부" },
    { value: "시각디자인", name: "시각디자인", department: "콘텐츠융합디자인학부" },
    { value: "제품디자인", name: "제품디자인", department: "콘텐츠융합디자인학부" },
    { value: "생명과학", name: "생명과학", department: "생명과학부" },
    { value: "컴퓨터공학", name: "컴퓨터공학", department: "전산전자공학부" },
    { value: "전자공학", name: "전자공학", department: "전산전자공학부" },
    { value: "컴퓨터공학심화", name: "컴퓨터공학심화", department: "전산전자공학부" },
    { value: "전자공학심화", name: "전자공학심화", department: "전산전자공학부" },
    { value: "IT", name: "IT", department: "전산전자공학부" },
    { value: "상담심리학", name: "상담심리학", department: "상담심리사회복지학부" },
    { value: "사회복지학", name: "사회복지학", department: "상담심리사회복지학부" },
    { value: "ICT창업", name: "ICT창업", department: "ICT창업학부" },
    { value: "GE(국제적 기업가정신)", name: "GE(국제적 기업가정신)", department: "ICT창업학부" },
    { value: "ICT융합", name: "ICT융합", department: "ICT창업학부" },
    { value: "학생설계융합", name: "학생설계융합", department: "창의융합교육원" },
    { value: "글로벌융합", name: "글로벌융합", department: "창의융합교육원" },
    { value: "글로벌한국학", name: "글로벌한국학", department: "창의융합교육원" },
    { value: "수학통계", name: "수학통계", department: "창의융합교육원" },
    { value: "AI융합", name: "AI융합", department: "AI융합교육원" },
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
      navigate("/swap/main");
    }
  };

  return (
    <>
      {/* Form */}
      <Form onSubmit={addUser}>
        <Row>
          <Col lg={6} md={6} className="mb-3">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" id="username" placeholder="이름을 입력하세요 " name="name" value={formData.name} onChange={handleChange} required />
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
                <Link to="/swap/terms-and-conditions">서비스 이용약관 </Link> 및 <Link to="/swap/personal-information">개인정보취급방침</Link>
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
