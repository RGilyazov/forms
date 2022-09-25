import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import TemplateList from "./template/TemplateList";
import TemplateModal from "./template/TemplateModal";
import * as APILib from "../api/formApAPI";

export default function FormApp() {
  const [state, setState] = useState({
    formTemplates: [],
  });

  const getTemplates = () => {
    APILib.getFormTemplates().then((res) => {
      setState({
        formTemplates: res.data,
      });
    });
  };

  useEffect(() => {
    getTemplates();
  }, []);

  const resetState = () => {
    getTemplates();
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <TemplateList
            formTemplates={state.formTemplates}
            resetState={resetState}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <TemplateModal create={true} resetState={resetState} />
        </Col>
      </Row>
    </Container>
  );
}
