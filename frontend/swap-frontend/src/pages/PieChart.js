// import node module libraries
import { Fragment, useLayoutEffect, useState, useRef } from "react";
import { Col, Row, Card, Table } from "react-bootstrap";
import ApexCharts from "components/elements/charts/ApexCharts";

// import MDI icons
import Icon from "@mdi/react";
import { mdiSquareRounded } from "@mdi/js";

// Import required data files
import { TrafficChannelChartSeries, TrafficChannelChartOptions } from "data/charts/ChartData";

const PieChart = ({ heading, data, count }) => {
  // const [surveyData, setSurveyData] = useState([]);
  const [surveyRate, setSurveyRate] = useState([]);
  const [surveyCount, setSurveyCount] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const [calculateDataLoading, setCalculateDataLoading] = useState(false);
  const [calculateRateLoading, setCalculateRateLoading] = useState(false);
  const colors = ["#754FFE", "#19cb98", "#e53f3c", "#ffaa46", "#28B2F4"];
  const text_colors = ["text-primary", "text-success", "text-danger", "text-info", "text-secondary"];

  useLayoutEffect(() => {
    setDataLoading(true);
    calculateData();
    // calculateRate();
  }, []);

  const surveyData = [...new Set(data)];

  const p = ["1"];

  const calculateData = () => {
    var survey_data = data;
    var counting = 0;
    let result = [...new Set(survey_data)];
    var survey_count = [];

    // setSurveyData((surveyData) => [...surveyData, result]);

    result.map((d, c) => {
      counting = 0;
      survey_data.map((item, index) => {
        if (item === d) {
          counting++;
        }
      });
      setSurveyCount((surveyCount) => [...surveyCount, counting]);
      survey_count.push(counting);
    });
    console.log("hihiihihi: ", survey_count);

    const surveySum = survey_count.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);

    survey_count.map((c) => {
      var result = (c / surveySum) * 100;
      setSurveyRate((surveyRate) => [...surveyRate, result]);
    });
    setCalculateDataLoading(true);
  };

  return (
    <Row className="d-flex justify-content-center align-items-center">
      {calculateDataLoading ? (
        <>
          <Col xl={8} lg={12} md={12} className="mb-4">
            <Card className="h-70">
              <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                <h4 className="mb-0">{heading}</h4>
              </Card.Header>
              <Card.Body className="p-1">
                {p.map((item, index) => {
                  const ChartOptions = {
                    labels: surveyData,
                    colors: colors,
                    chart: { type: "donut" },
                    legend: { show: !1 },
                    dataLabels: { enabled: !1 },
                    plotOptions: { pie: { donut: { size: "50%" } } },
                    stroke: { width: 2 },
                    responsive: [
                      { breakpoint: 1, options: { chart: { height: 300 } } },
                      { breakpoint: 1, options: { chart: { height: 200 } } },
                    ],
                  };
                  return (
                    <>
                      <ApexCharts options={ChartOptions} series={surveyCount} type="donut" height={260} />;
                    </>
                  );
                })}
                <div className="table-responsive">
                  <Table className="w-100 mt-5 text-nowrap" borderless>
                    <tbody>
                      {surveyData.map((item, index) => {
                        var i = index;
                        var style = text_colors[index] + " fs-5 me-2";
                        var percent = surveyRate[i].toFixed(2);
                        return (
                          <tr>
                            <td className="text-dark fw-medium py-1">
                              <Icon path={mdiSquareRounded} className={style} size={0.6} />
                              {item}
                            </td>
                            <td className="text-end fw-semi-bold py-1 text-dark">{surveyCount[i]}</td>
                            <td className="text-end py-1">{percent}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </>
      ) : (
        ""
      )}
    </Row>
  );
};

export default PieChart;
