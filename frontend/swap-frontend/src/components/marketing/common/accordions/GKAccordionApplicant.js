// import node module libraries
import React, { useContext, Fragment } from "react";
import { Link, Route } from "react-router-dom";
import { Accordion, useAccordionButton, AccordionContext, ListGroup, Col, Form } from "react-bootstrap";

import Icon from "@mdi/react";
import { mdiPlay } from "@mdi/js";

// import simple bar scrolling used for notification item scrolling
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const GKAccordionApplicant = ({ accordionItems, itemClass }) => {
  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <Fragment>
        <Link
          to="#"
          onClick={decoratedOnClick}
          aria-expanded={isCurrentEventKey}
          className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
          data-bs-toggle="collapse"
          aria-controls="courseTwo"
        >
          <div className="me-auto">신청한 학생들</div>
          <span className="chevron-arrow ms-4">
            <i className="fe fe-chevron-down fs-4"></i>
          </span>
        </Link>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Accordion defaultActiveKey="1">
        <ListGroup as="ul" variant="flush">
          <SimpleBar style={{ maxHeight: "700px" }}>
            {accordionItems.length > 0 ? (
              <>
                <ListGroup.Item key="1" as="li">
                  <ContextAwareToggle eventKey="1">신청한 학생들 </ContextAwareToggle>
                  <Accordion.Collapse eventKey="1" className="test">
                    <ListGroup className="py-4" as="ul">
                      {accordionItems.map((subitem, subindex) => (
                        <ListGroup.Item key={subindex} as="li" className="px-0 py-1 border-0">
                          <Link to={subitem.user_id.toString()} className={`d-flex justify-content-between align-items-center text-inherit text-decoration-none border-bottom`}>
                            <div className="text-truncate mb-2">
                              <span className="fs-5">{subitem.name}</span>
                            </div>
                            <div className="text-truncate">
                              <span>({subitem.student_id})</span>
                            </div>
                          </Link>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup.Item>
              </>
            ) : (
              <ListGroup.Item key="1" as="li" className={`${itemClass ? itemClass : ""}`}>
                <ContextAwareToggle eventKey="1">신청한 학생들</ContextAwareToggle>
                <Accordion.Collapse eventKey="1">
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 fs-5 px-0 py-4">신청한 학생이 없습니다</ListGroup.Item>
                  </ListGroup>
                </Accordion.Collapse>
              </ListGroup.Item>
            )}
          </SimpleBar>
        </ListGroup>
      </Accordion>
    </Fragment>
  );
};

export default GKAccordionApplicant;
