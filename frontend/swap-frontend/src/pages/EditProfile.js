import { Form, Image, Button, Card, Col, Row } from "react-bootstrap";
import React, { useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
// import custom components
import { FormSelect } from "components/elements/form-select/FormSelect";
import { FlatPickr } from "components/elements/flat-pickr/FlatPickr";

import axios from "axios";

const EditProfile = (props) => {
  const [editInfo, seteditInfo] = useState();
  const [isEdit, setIsEdit] = useState(false);

  useLayoutEffect(() => {
    seteditInfo(props.userInfo[0]);
  }, []);

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
    console.log(editInfo);
    var params = new URLSearchParams();

    params.append("id", props.userInfo[0].id);
    params.append("status", props.userInfo[0].status);
    params.append("name", editInfo.name);
    params.append("phone", editInfo.phone);
    params.append("email", editInfo.email);
    params.append("student_id", editInfo.student_id);
    params.append("student_class", editInfo.student_class);
    params.append("department", editInfo.department);
    params.append("semester", editInfo.semester);
    params.append("major1", editInfo.major1);
    params.append("major2", editInfo.major2);

    if (window.confirm("프로필 정보를 수정하시겠습니까?") && editInfo) {
      console.log(editInfo);
      const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "user/update", params);
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
                    <Form.Control type="text" id="department" name="department" placeholder="학부를 입력하세요 " value={props.userInfo[0].department} onChange={onEdit} readOnly />
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
                    <Form.Control type="number" id="semester" name="semester" placeholder="학기" min="1" max="12" value={props.userInfo[0].semester} onChange={onEdit} readOnly />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>전공 1</Form.Label>
                    <Form.Control type="text" id="major1" name="major1" placeholder="1전공을 입력하세요 " value={props.userInfo[0].major1} readOnly onChange={onEdit} />
                  </Col>
                  <Col lg={6} md={6} className="mb-3">
                    <Form.Label>전공 2</Form.Label>
                    <Form.Control type="text" id="major2" name="major2" placeholder="2전공을 입력하세요" value={props.userInfo[0].major2} onChange={onEdit} readOnly />
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
                <Col lg={6} md={6} className="mb-3">
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
