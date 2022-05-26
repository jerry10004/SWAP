import { Fragment, useLayoutEffect, useState, useRef } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { CSVLink } from "react-csv";

import axios from "axios";
import { CardHeader } from "reactstrap";

const ApplicationDataView = (props) => {
  const [originalForm, setOriginalForm] = useState([]);
  const [tableHeading, setTableHeading] = useState([]);
  const [applicantInformation, setApplicantInformation] = useState([]);
  const [application_data, setApplication_data] = useState([]);
  const [programName, setProgramName] = useState();

  useLayoutEffect(() => {
    readFormData(props.param3.id);
    readApplicantInformation(props.param3.id);
    readProgramName(props.param3.id);
  }, []);

  // 해당 프로그램의 원래 신청서 - 헤딩을 알기 위해서
  const readFormData = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "application/readApplicationForm/" + id);
    var json_total = JSON.parse(response.data[0].application_form);
    setOriginalForm(json_total);
  };

  const readApplicantInformation = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/" + id);
    setApplicantInformation(response.data);
  };

  const readProgramName = async (id) => {
    var params = new URLSearchParams();
    params.append("id", id);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/name", params);
    setProgramName(response.data[0].program_name);
  };

  const DisplayHeading = originalForm.map((info) => {
    return (
      <>
        <th>{info.label}</th>
      </>
    );
  });

  // const DisplayData = () => {
  //   if (applicantInformation.length > 0) {
  //     applicantInformation.map((info, count) => {
  //       var application_data = JSON.parse(info.application_form);
  //       return (
  //         <tr>
  //           <td>{count + 1}</td>
  //           <td>{info.name}</td>
  //           <td>{info.student_id}</td>
  //           <td>{info.phone}</td>
  //           <td>{info.email}</td>
  //           <td>{info.department}</td>
  //           <td>{info.student_class}</td>

  //           {application_data.map((item) => {
  //             return (
  //               <td>
  //                 {item.userData.map((sub, index) => {
  //                   console.log("hihihihi: ", sub);

  //                   if (index === item.userData.length - 1) {
  //                     return sub;
  //                   } else {
  //                     return sub + ", ";
  //                   }
  //                 })}
  //               </td>
  //             );
  //           })}
  //         </tr>
  //       );
  //     });
  //   }
  // };

  const DisplayData = applicantInformation.map((info, count) => {
    var application_data = JSON.parse(info.application_form);
    return (
      <tr>
        <td>{count + 1}</td>
        <td>{info.name}</td>
        <td>{info.student_id}</td>
        <td>{info.phone}</td>
        <td>{info.email}</td>
        <td>{info.department}</td>
        <td>{info.student_class}</td>

        {application_data.map((item) => {
          return (
            <td>
              {item.userData.map((sub, index) => {
                console.log("hihihihi: ", sub);

                if (index === item.userData.length - 1) {
                  return sub;
                } else {
                  return sub + ", ";
                }
              })}
            </td>
          );
        })}
      </tr>
    );
  });

  const exportTableToExcel = () => {
    var downloadLink;
    var filename = programName;
    var dataType = "application/vnd.ms-excel";
    var tableSelect = document.getElementById("tblData");
    var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

    filename = filename ? filename + " 신청응답" + ".xls" : "excel_data.xls";

    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(["\ufeff", tableHTML], {
        type: dataType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadLink.href = "data:" + dataType + ", " + tableHTML;

      downloadLink.download = filename;
      downloadLink.click();
    }
  };

  return (
    <Fragment>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 ms-2">
              <h4>신청응답</h4>
            </p>
            <Button onClick={exportTableToExcel}>엑셀로 다운받기</Button>
          </div>
        </Card.Header>
        <Card.Body className="p">
          {applicantInformation.length > 0 ? (
            <div className="table-responsive">
              <Table className="text-nowrap table" id="tblData" border="1" bordered>
                <thead className="table-light">
                  <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>학번</th>
                    <th>전화번호</th>
                    <th>이메일</th>
                    <th>학부</th>
                    <th>학년</th>
                    {DisplayHeading}
                  </tr>
                </thead>
                <tbody>{DisplayData}</tbody>
              </Table>
            </div>
          ) : (
            <>
              <div className="mt-5 d-flex justify-content-center">제출된 신청서가 없습니다.</div>
            </>
          )}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default ApplicationDataView;
