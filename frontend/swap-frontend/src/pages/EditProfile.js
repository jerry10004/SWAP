import { Form, Image, Button, Card, Col, Row } from "react-bootstrap";
import React, { useState, useLayoutEffect } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
// import custom components
import { FormSelect } from "components/elements/form-select/FormSelect";
import { FlatPickr } from "components/elements/flat-pickr/FlatPickr";
import data from "../layouts/form/data.json";

import axios from "axios";

const EditProfile = (props) => {
  const [editInfo, seteditInfo] = useState({ name: props.userInfo[0].name, student_id: "", phone: "", department: "", student_class: 1, semester: "", major1: "", major2: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [dep, setdepartment] = useState(null);
  const [Major, setMajor] = useState(null);
  const [Major2, setMajor2] = useState(null);
  const [MajorList, setMajorList] = useState([]);

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 48.4,
      border: "1px solid #e8e7ed",
    }),
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

  useLayoutEffect(() => {
    seteditInfo(props.userInfo[0]);
  }, []);

  // const [formData, setFormData] = useState({
  //   name: name,
  //   student_id: "",
  //   phone: "",
  //   department: "",
  //   student_class: 1,
  //   semester: "",
  //   major1: "",
  //   major2: "",
  // // });

  const handleChange = (event) => {
    seteditInfo({
      ...editInfo,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  const handledepartmentChange = (obj) => {
    setdepartment(obj);
    setMajorList(obj.majors);
    setMajor(null);
    seteditInfo((prevState) => ({
      ...prevState,
      department: obj.department,
    }));
  };

  const handleMajorChange = (obj) => {
    setMajor(obj);
    seteditInfo({
      ...editInfo,
      major1: obj.name,
    });
  };

  const handleMajor2Change = (obj) => {
    setMajor2(obj);
    seteditInfo({
      ...editInfo,
      major2: obj.name,
    });
  };

  const onEdit = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    seteditInfo({
      ...editInfo,
      [name]: value,
    });
  };

  const edit = () => {
    setIsEdit(true);
  };

  const save = () => {
    updateInfo();
    setIsEdit(false);
  };

  const updateInfo = async () => {
    console.log("~~~~~");
    console.log(editInfo);
    var params_user = new URLSearchParams();
    var params_admin = new URLSearchParams();

    params_user.append("id", props.userInfo[0].id);
    params_user.append("status", props.userInfo[0].status);
    params_user.append("name", editInfo.name);
    params_user.append("phone", editInfo.phone);
    params_user.append("email", editInfo.email);
    params_user.append("student_id", editInfo.student_id);
    params_user.append("student_class", editInfo.student_class);
    params_user.append("department", editInfo.department);
    params_user.append("semester", editInfo.semester);
    params_user.append("major1", editInfo.major1);
    params_user.append("major2", editInfo.major2);

    params_admin.append("id", props.userInfo[0].id);
    params_admin.append("name", editInfo.name);
    params_admin.append("phone", editInfo.phone);
    params_admin.append("email", editInfo.email);
    params_admin.append("email", editInfo.department);

    console.log(editInfo.name);

    if (window.confirm("프로필 정보를 수정하시겠습니까?") && editInfo) {
      if (editInfo.status === 0 || editInfo.status == -2) {
        const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "user/update", params_user);
        const response1 = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "admin/update", params_admin);
      } else {
        const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "user/update", params_user);
      }

      alert("프로필 정보가 수정 되었습니다.");
      window.location.reload();
    }
  };
  return (
    <Card className="border-0">
      <Card.Header>
        <div className="mb-3 mb-lg-0">
          <h3 className="mb-0">프로필 정보</h3>
          <p className="mb-0">이곳에서 본인의 프로필 정보를 확인하실 수 있습니다.</p>
        </div>
      </Card.Header>
      <Card.Body>
        {/* <div className="d-lg-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center mb-4 mb-lg-0">
            <Image src={window.sessionStorage.getItem("profileImg")} id="img-uploaded" className="avatar-xl rounded-circle" alt="" />
            <div className="ms-3">
              <h4 className="mb-0">프로필 사진</h4>
              <p className="mb-0">800px보다 작은 PNG나 JPG 사진을 선택해 주세요.</p>
            </div>
          </div>
          <div>
            <Button variant="outline-white" size="sm">
              수정
            </Button>{" "}
            <Button variant="outline-danger" size="sm">
              삭제
            </Button>
          </div>
        </div> */}
        {/* <hr className="my-5" /> */}
        <div>
          <h4 className="mb-4">개인 정보</h4>
          {/* <p className="mb-4">개인 정보를 수정하세요.</p> */}
          {/* Form */}
          <Form>
            {isEdit === false ? (
              props.userInfo[0].status === 1 ? (
                <Row>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" id="name" name="name" placeholder="이름을 입력하세요 " value={props.userInfo[0].name} onChange={onEdit} readOnly />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>이메일 </Form.Label>
                    <Form.Control type="email" id="email" name="email" placeholder="이메일을 입력하세요 " value={props.userInfo[0].email} onChange={onEdit} readOnly />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>학번 </Form.Label>
                    <Form.Control type="text" id="student_id" name="student_id" placeholder="학번을 입력하세요" value={props.userInfo[0].student_id} onChange={onEdit} readOnly />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>전화 </Form.Label>
                    <Form.Control type="tel" id="phone" name="phone" placeholder="전화번호를 입력하세요 " value={props.userInfo[0].phone} required onChange={onEdit} readOnly />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>학부</Form.Label>
                    <Form.Control type="text" id="department" name="department" placeholder="학부를 입력하세요 " value={props.userInfo[0].department} readOnly />
                  </Col>
                  <Col lg={3} md={3} className="mb-3">
                    <Form.Label>학년 </Form.Label>
                    <Form.Control type="number" id="student_class" name="student_class" min="1" max="12" placeholder="학년 " value={props.userInfo[0].student_class} readOnly />
                  </Col>
                  <Col lg={3} md={3} className="mb-3">
                    <Form.Label>학기 </Form.Label>
                    <Form.Control type="number" id="semester" name="semester" min="1" max="12" placeholder="학기 " value={props.userInfo[0].semester} readOnly />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>전공 1</Form.Label>
                    <Form.Control type="text" id="major1" name="major1" placeholder="1전공 " value={props.userInfo[0].major1} readOnly />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>전공 2</Form.Label>
                    <Form.Control type="text" id="major2" name="major2" placeholder="2전공 " value={props.userInfo[0].major2} readOnly />
                  </Col>
                  <Col sm={12} md={12}>
                    <Button variant="primary" className="mt-3" onClick={edit}>
                      프로필 수정하기
                    </Button>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" id="name" name="name" placeholder="이름을 입력하세요 " value={props.userInfo[0].name} onChange={onEdit} readOnly />
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>이메일 </Form.Label>
                    <Form.Control type="email" id="email" name="email" placeholder="이메일을 입력하세요 " value={props.userInfo[0].email} onChange={onEdit} readOnly />
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>전화 </Form.Label>
                    <Form.Control type="tel" id="phone" name="phone" placeholder="전화번호를 입력하세요 " value={props.userInfo[0].phone} onChange={onEdit} readOnly />
                  </Col>
                  <Col lg={12} md={12} className="mb-3">
                    <Form.Label>소속</Form.Label>
                    <Form.Control type="text" id="department" name="department" placeholder="소속을 입력하세요 " value={props.userInfo[0].department} onChange={onEdit} readOnly />
                  </Col>
                  <Col sm={12} md={12}>
                    <Button variant="primary" className="mt-3" onClick={edit}>
                      프로필 수정하기
                    </Button>
                  </Col>
                </Row>
              )
            ) : props.userInfo[0].status === 1 ? (
              <Row>
                <Col lg={6} md={6} className="mb-3">
                  <Form.Label>이름</Form.Label>
                  <Form.Control type="text" id="name" name="name" placeholder="이름을 입력하세요 " onChange={onEdit} required />
                </Col>
                <Col lg={6} md={6} className="mb-3">
                  <Form.Label>이메일 </Form.Label>
                  <Form.Control type="email" id="email" name="email" placeholder="이메일을 입력하세요 " onChange={onEdit} readOnly required />
                </Col>
                <Col lg={6} md={6} className="mb-3">
                  <Form.Label>학번 </Form.Label>
                  <Form.Control type="text" id="student_id" name="student_id" placeholder="학번을 입력하세요 " onChange={onEdit} required />
                </Col>
                <Col lg={6} md={6} className="mb-3">
                  <Form.Label>전화 </Form.Label>
                  <Form.Control type="tel" id="phone" name="phone" placeholder="전화번호를 입력하세요 " required onChange={onEdit} />
                </Col>
                {/* <Col lg={6} md={6} className="mb-3">
                  <Form.Label>학부</Form.Label>
                  <Form.Control type="text" id="department" name="department" placeholder="학부를 입력하세요 " onChange={onEdit} required />
                </Col>
                <Col lg={3} md={3} className="mb-3">
                  <Form.Label>학년 </Form.Label>
                  <Form.Select id="student_class" name="student_class" aria-label="Default select example" placeholder="학년 " onChange={onEdit} required>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </Col>
                <Col lg={3} md={3} className="mb-3">
                  <Form.Label>학기 </Form.Label>
                  <Form.Control type="number" id="semester" name="semester" min="1" max="12" placeholder="학기 " onChange={onEdit} required />
                </Col>
                <Col lg={6} md={6} className="mb-3">
                  <Form.Label>전공 1</Form.Label>
                  <Form.Control type="text" id="major1" name="major1" placeholder="1전공 " required onChange={onEdit} />
                </Col>
                <Col lg={6} md={6} className="mb-3">
                  <Form.Label>전공 2</Form.Label>
                  <Form.Control type="text" id="major2" name="major2" placeholder="2전공 " onChange={onEdit} />
                </Col> */}

                <Col lg={6} md={6} className="mb-3">
                  <Form.Label>학부</Form.Label>
                  <Select
                    readOnly
                    required
                    styles={customStyles}
                    placeholder={props.userInfo[0].department}
                    value={dep}
                    options={data}
                    onChange={handledepartmentChange}
                    getOptionLabel={(x) => x.department}
                    getOptionValue={(x) => x.department}
                  />
                </Col>
                <Col lg={3} md={3} className="mb-3">
                  <Form.Label>학년 </Form.Label>
                  <Form.Select id="student_class" name="student_class" aria-label="Default select example" placeholder="학년 " value={props.userInfo[0].student_class} onChange={onEdit} readOnly>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Form.Select>
                </Col>
                <Col lg={3} md={3} className="mb-3">
                  <Form.Label>학기 </Form.Label>
                  <Form.Control type="number" id="semester" name="semester" placeholder="학기" min="1" max="12" value={props.userInfo[0].semester} onChange={onEdit} required />
                </Col>

                {/* <Form.Control type="text" id="major1" name="major1" placeholder="1전공을 입력하세요 " value={props.userInfo[0].major1} readOnly onChange={onEdit} /> */}
                <Col lg={6} md={6} className="mb-3">
                  <Form.Label>전공 1</Form.Label>
                  <Select
                    required
                    styles={customStyles}
                    placeholder={props.userInfo[0].major1}
                    value={Major}
                    options={MajorList}
                    onChange={handleMajorChange}
                    getOptionLabel={(x) => x.name}
                    getOptionValue={(x) => x.name}
                  />
                  {/* <Form.Control type="text" id="major1" name="major1" placeholder="1전공을 입력하세요 " onChange={handleChange} required /> */}
                </Col>

                {/* <Form.Control type="text" id="major2" name="major2" placeholder="2전공을 입력하세요" value={props.userInfo[0].major2} onChange={onEdit} readOnly /> */}
                <Col lg={6} md={6} className="mb-3">
                  <Form.Label>전공 2</Form.Label>
                  <Select
                    styles={customStyles}
                    placeholder={props.userInfo[0].major2}
                    value={Major2}
                    options={major2}
                    getOptionLabel={(x) => x.value}
                    getOptionValue={(x) => x.value}
                    onChange={handleMajor2Change}
                  />
                  {/* <Form.Control type="text" id="major2" name="major2" placeholder="2전공을 입력하세요 " onChange={handleChange} /> */}
                </Col>
                <Col sm={12} md={12}>
                  <Button variant="primary" className="mt-3" onClick={save}>
                    프로필 저장하기
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col lg={12} md={12} className="mb-3">
                  <Form.Label>이름</Form.Label>
                  <Form.Control type="text" id="name" name="name" placeholder="이름을 입력하세요 " onChange={onEdit} required />
                </Col>
                <Col lg={12} md={12} className="mb-3">
                  <Form.Label>이메일 </Form.Label>
                  <Form.Control type="email" id="email" name="email" placeholder="이메일을 입력하세요 " onChange={onEdit} required />
                </Col>

                <Col lg={12} md={12} className="mb-3">
                  <Form.Label>전화 </Form.Label>
                  <Form.Control type="tel" id="phone" name="phone" placeholder="전화번호를 입력하세요 " onChange={onEdit} />
                </Col>
                <Col lg={12} md={12} className="mb-3">
                  <Form.Label>소속</Form.Label>
                  <Form.Control type="text" id="department" name="department" placeholder="소속을 입력하세요 " onChange={onEdit} required />
                </Col>
                <Col sm={12} md={12}>
                  <Button variant="primary" className="mt-3" onClick={save}>
                    프로필 저장하기
                  </Button>
                </Col>
              </Row>
            )}
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default EditProfile;
