// import node module libraries
import { Col, Row, Card, Table, Image } from "react-bootstrap";

// Import required data files
import {} from "data/charts/ChartData";

const TableChart = ({ heading, data, count }) => {
  var num = count;
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col xl={8} lg={12} md={12} className="mb-4">
        <Card className="h-100 ">
          <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
            <h4 className="mb-0">{heading}</h4>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table className="mb-0 text-nowrap">
                <tbody>
                  {/* <h3>{num}</h3>*/}
                  {/* <h1>{heading}</h1> */}
                  {/* <h3>{data}</h3> */}
                  {/* <h3>{data[num]}</h3> */}
                  {data !== null
                    ? data.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="border-top-0 ">
                              <span className="align-middle ">{item}</span>
                            </td>
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default TableChart;
