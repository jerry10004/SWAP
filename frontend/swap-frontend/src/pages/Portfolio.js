import { Fragment, useLayoutEffect, useState } from "react";
import { Card, Button, Row, Col, Image, Table } from "react-bootstrap";
import ProfileBackground from "assets/images/background/profile-bg.jpg";
import axios from "axios";

const Portfolio = (props) => {
  const [userInfo, setUserInfo] = useState();
  const [completeProgram, setCompleteProgram] = useState([]);
  const user_id = window.sessionStorage.getItem("id");

  useLayoutEffect(() => {
    setUserInfo(props.userInfo[0]);
    readCompleteProgram();
  }, []);

  const readCompleteProgram = async () => {
    var params = new URLSearchParams();
    params.append("user_id", user_id);
    params.append("status", 2);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/read/status", params);
    setCompleteProgram(response.data);
    console.log("이거봐!!!, ", response.data);
  };

  return (
    <Fragment>
      {" "}
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between">
            <div>
              <h3>나의 활동 내역</h3>
              <p className="mb-0">본인의 활동 내역을 한눈에 확인 하실 수 있습니다.</p>
            </div>
            <Button className="bg-success border-0">PDF로 다운받기</Button>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <div>
            <div>
              <Row className="align-items-center">
                <Col xl={12} lg={12} md={12} sm={12}>
                  {/* <!-- Bg --> */}
                  <div
                    className="pt-16 rounded-top-md"
                    style={{
                      //   background: `url(${ProfileBackground})`,
                      backgroundColor: "#754ffe",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  >
                    {" "}
                  </div>
                  <div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none rounded-bottom-md shadow-sm">
                    <div className="d-flex align-items-center">
                      <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n10">
                        <Image src={window.sessionStorage.getItem("profileImg")} className="w-10 rounded-circle border border-4 border-white position-relative" alt="" />
                        {/* <Image src={dashboardData.avatar} className="avatar-xl rounded-circle border border-4 border-white position-relative" alt="" /> */}
                      </div>
                      <div className="lh-1">
                        <h2 className="mb-0">{props.userInfo[0].name}</h2>
                        <p className="mb-0 d-block">{props.userInfo[0].email}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Card>
                <Card.Body>
                  <Table>
                    <thead className="table-light">
                      <tr>
                        <th>번호</th>
                        <th>프로그램</th>
                        <th>날짜</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completeProgram.map((sub, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{sub.program_name}</td>
                            <td>
                              {sub.start_date} ~ <br></br>
                              {sub.end_date}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default Portfolio;
