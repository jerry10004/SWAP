import { Fragment, useLayoutEffect, useState, useRef } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { CSVLink } from "react-csv";

import axios from "axios";
import { CardHeader } from "reactstrap";

import PieChart from "pages/PieChart";
import TableChart from "pages/TableChart";

const SurveyDataView = (props) => {
  const [originalForm, setOriginalForm] = useState([]);
  const [surveyHeading, setSurveyHeading] = useState([]);
  const [surveyData, setSurveyData] = useState([]);
  const [surveyType, setSurveyType] = useState([]);

  const [headingLoading, setHeadingLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);

  const [submitterInformation, setSubmitterInformation] = useState([]);
  const [typeInformation, setTypeInformation] = useState([]);

  const [programName, setProgramName] = useState();

  var json_survey = "";
  var question_num = "";
  var submitter_num = "";

  useLayoutEffect(() => {
    readFormData(props.param3.id);
    readApplicantInformation(props.param3.id);
    readProgramName(props.param3.id);
  }, []);

  // 해당 프로그램의 원래 설문지 - 헤딩을 알기 위해서
  const readFormData = async (id) => {
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "survey/readSurveyForm/" + id);
    var json_total = JSON.parse(response.data[0].survey_form);
    setOriginalForm(json_total);
    json_survey = json_total;
    question_num = json_total.length;

    json_total.map((item, count) => {
      var label = count + 1 + ". " + item.label;
      if (json_total.length >= surveyHeading.length) setSurveyHeading((surveyHeading) => [...surveyHeading, label]);
    });

    json_total.map((item, count) => {
      if (json_total.length >= surveyHeading.length) setSurveyType((surveyType) => [...surveyType, item.type]);
    });

    setHeadingLoading(true);
  };

  // 설문지 제출한 사람의 각 정보들
  const readApplicantInformation = async (id) => {
    setDataLoading(false);
    const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/survey/data/" + id);
    console.log("각 사람정보 : ", response.data);
    setSubmitterInformation(response.data);

    submitter_num = response.data.length;
    setSurveyData((surveyData) => [...surveyData, response.data]);

    setDataLoading(true);
    // confirm();
  };

  const confirm = () => {
    // if (surveyData.length > 0) {
    if (dataLoading) {
      console.log(surveyData);
      console.log(surveyData[0]);
    }
  };

  const readProgramName = async (id) => {
    var params = new URLSearchParams();
    params.append("id", id);
    const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "program/name", params);
    setProgramName(response.data[0].program_name);
  };

  return (
    <Fragment>
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0 ms-2">
              <h4>설문응답</h4>
            </p>
          </div>
        </Card.Header>
        <Card.Body className="p">
          {headingLoading && dataLoading && submitterInformation.length > 0
            ? surveyType.map((type, count) => {
                if (type === "radio-group" || type === "select" || type === "checkbox-group") {
                  return <PieChart heading={surveyHeading[count]} data={surveyData[0][count]} count={count} />;
                } else if (type === "textarea" || type === "text" || type === "date-field") {
                  return <TableChart heading={surveyHeading[count]} data={surveyData[0][count]} count={count} />;
                }
              })
            : ""}
          {/* {headingLoading && dataLoading ? <h1>{surveyData[0][4]}</h1> : ""} */}
          {/* <SurveyChart />*/}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default SurveyDataView;
