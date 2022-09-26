import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import TemplateList from "./template/TemplateList";
import TemplateModal from "./template/TemplateModal";
import * as APILib from "../api/formApAPI";

export default function TemplatesPage() {
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
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex flex-column m-2 w-fit">
        <TemplateList
          formTemplates={state.formTemplates}
          resetState={resetState}
        />
        <div className="flex-grow-0 justify-content-center m-2">
          <TemplateModal create={true} resetState={resetState} />
        </div>
      </div>
    </div>
  );
}
