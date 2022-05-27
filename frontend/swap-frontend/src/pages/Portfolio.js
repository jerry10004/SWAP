import { Fragment, useLayoutEffect, useState, useRef } from "react";
import { Card, Button, Row, Col, Image, Table, Form } from "react-bootstrap";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";
import ProfileBackground from "assets/images/background/profile-bg.jpg";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import moment from "moment";

const Portfolio = (props) => {
  const printRef = useRef();
  const [userInfo, setUserInfo] = useState();
  const [completeProgram, setCompleteProgram] = useState([]);
  const user_id = window.sessionStorage.getItem("id");
  const [category, setCategory] = useState(["대회", "봉사", "캠프", "행사", "맥북", "특강", "기타", "프로젝트/스터디", "인턴/현장실습"]);
  const [countCategory, setCountCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [usertitle, setUserTitle] = useState();
  const [userCategory, setUserCategory] = useState();

  useLayoutEffect(() => {
    setUserInfo(props.userInfo[0]);
    readCompleteProgram();
  }, []);

  const modalState = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const afterOpen = () => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  };

  const beforeClose = () => {
    return new Promise((resolve) => {
      setOpacity(1);
      setTimeout(resolve, 300);
    });
  };

  const toggleModal = (e) => {
    setOpacity(1);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setUserTitle(e.tartget.value);
  };
  const handleChange_category = (e) => {
    setUserCategory(e.tartget.value);
  };

  const createApplication = async () => {
    var params = new URLSearchParams();
    params.append("name", usertitle);
    params.append("category_id", userCategory);

    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "application/add", params);
    if (response.data === 1) {
      alert("활동내역이 저장 되었습니다.");
      window.location.reload();
    } else if (response.data === -2) alert("활동내역 추가를 실패했습니다.");
    setOpacity(1);
    setIsOpen(false);
  };

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, { allowTaint: true, useCORS: true });
    const data = canvas.toDataURL("image/PNG");

    const pdf = new jsPDF("p", "mm", "a4");

    var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
    var pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
    var imgHeight = (canvas.height * imgWidth) / canvas.width;
    var heightLeft = imgHeight;
    var margin = 0;

    var doc = new jsPDF("p", "mm", "a4");
    var position = 0;

    // // 첫 페이지 출력
    doc.addImage(data, "PNG", margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 한 페이지 이상일 경우 루프 돌면서 출력
    while (heightLeft >= 20) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(data, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    doc.save("내활동내역.pdf");
  };

  const readCompleteProgram = async () => {
    var count = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var params = new URLSearchParams();
    params.append("user_id", user_id);
    params.append("status", 2);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/read/status", params);
    response.data.map((item) => {
      item.start_date = moment(item.start_date).format("YY-MM-DD");
      item.end_date = moment(item.end_date).format("YY-MM-DD");
    });

    setCompleteProgram(response.data);

    response.data.map((item) => {
      if (item.category_name === "대회") {
        count[0] += 1;
      } else if (item.category_name === "봉사") {
        count[1] += 1;
      } else if (item.category_name === "캠프") {
        count[2] += 1;
      } else if (item.category_name === "행사") {
        count[3] += 1;
      } else if (item.category_name === "맥북") {
        count[4] += 1;
      } else if (item.category_name === "특강") {
        count[5] += 1;
      } else if (item.category_name === "기타") {
        count[6] += 1;
      } else if (item.category_name === "프로젝트/스터디") {
        count[7] += 1;
      } else if (item.category_name === "인턴/현장실습") {
        count[8] += 1;
      }
    });

    setCountCategory(count);
  };

  return (
    <Fragment>
      {countCategory ? (
        <Card className="bg-white">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <div>
                <h3>나의 활동 내역</h3>
                <p className="mb-0">본인의 활동 내역을 한눈에 확인 하실 수 있습니다.</p>
              </div>
              <Button className="bg-success border-0" onClick={handleDownloadPdf}>
                PDF로 다운받기
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="p-0">
            <div ref={printRef}>
              <div>
                <Row className="align-items-center">
                  <Col xl={12} lg={12} md={12} sm={12}>
                    {/* <!-- Bg --> */}
                    <div className="bg-primary p-5">
                      {/* <div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none shadow-sm"> */}
                      <div className="d-flex align-items-center">
                        <div className="me-2  d-flex justify-content-end align-items-end">
                          <Image src={window.sessionStorage.getItem("profileImg")} className="w-10 rounded-circle " alt="" />
                          {/* <Image src={dashboardData.avatar} className="avatar-xl rounded-circle border border-4 border-white position-relative" alt="" /> */}
                        </div>
                        <div className="ms-2 lh-1 text-white">
                          <h1 className="mb-0 text-white font-weight-bold border-bottom border-3 border-white">{props.userInfo[0].name}</h1>
                          <p className="mb-0 d-block font-weight-light mt-2">{props.userInfo[0].email}</p>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                  </Col>
                </Row>
                <Card className="bg-white">
                  <Card.Body className="bg-white">
                    <h3 className="text-primary mb-3">활동 내역</h3>
                    {category.map((_category, i) => {
                      var index = 0;
                      if (countCategory[i] > 0)
                        return (
                          <div>
                            <h4>{_category}</h4>
                            <Table>
                              <thead className="table-light">
                                <tr>
                                  <th>번호</th>
                                  <th>프로그램</th>
                                  <th>시작일자</th>
                                  <th>종료일자</th>
                                </tr>
                              </thead>
                              <tbody>
                                {completeProgram.map((_program) => {
                                  if (_program.category_name === _category && _program.status === 4) {
                                    index += 1;
                                    return (
                                      <tr>
                                        <td>{index}</td>
                                        <td>{_program.program_name}</td>
                                        <td>{_program.start_date}</td>
                                        <td> {_program.end_date}</td>
                                      </tr>
                                    );
                                  }
                                })}{" "}
                              </tbody>
                            </Table>
                          </div>
                        );
                    })}
                  </Card.Body>
                </Card>
              </div>
            </div>
            {isOpen ? (
              <ModalProvider backgroundComponent={FadingBackground}>
                <StyledModal isOpen={isOpen} afterOpen={afterOpen} beforeClose={beforeClose} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal} opacity={opacity} backgroundProps={opacity}>
                  <div>
                    <button type="button" class="btn-close" aria-label="Close" onClick={toggleModal}></button>

                    <Form className="mt-2">
                      <Row>
                        <Col xs={12} className="mt-3">
                          <Form.Group controlId="program_category">
                            <Form.Label>
                              추가 할 활동내역의 카테고리를 선택해주세요. <span className="text-danger">*</span>
                            </Form.Label>
                            <select class="form-select" id="program_category" name="program_category" onChange={handleChange_category} required>
                              <option selected value="">
                                카테고리
                              </option>
                              <option value="1">대회</option>
                              <option value="2">봉사</option>
                              <option value="3">캠프</option>
                              <option value="4">행사</option>
                              <option value="5">맥북</option>
                              <option value="6">프로젝트/스터디</option>
                              <option value="7">인턴/현장실습</option>
                              <option value="8">특강</option>
                              <option value="9">기타</option>
                            </select>
                            <Form.Control.Feedback type="invalid">카테고리를 선택해주세요.</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} className="mt-6">
                          <Form.Group controlId="formProjectTitle">
                            <Form.Label>
                              프로그램 이름을 입력해주세요. <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter application title" required onChange={handleChange} />
                          </Form.Group>
                        </Col>
                        <Col xs={12} className="mt-6 d-flex justify-content-end">
                          <Button variant="primary" type="button" className="ms-2" onClick={createApplication}>
                            저장
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </StyledModal>
              </ModalProvider>
            ) : (
              <></>
            )}
          </Card.Body>
          {/* <Card.Footer>
            <div className="d-flex justify-content-end">
              <Button className="bg-primary border-0" onClick={modalState}>
                추가하기
              </Button>
            </div>
          </Card.Footer> */}
        </Card>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default Portfolio;

const StyledModal = Modal.styled`
  width: 50rem;
  height: auto;
  padding : 20px;
  border-radius:20px;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;
