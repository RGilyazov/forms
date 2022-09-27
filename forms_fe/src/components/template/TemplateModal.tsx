import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import TemplateForm from "./TemplateForm";
import { FormAPITypes } from "../../api/formAppAPITypes";
type TemplateModalProps = {
  resetState: () => void;
  create: boolean;
  formTemplate?: FormAPITypes.FormTemplate;
};

export default function TemplateModal(props: TemplateModalProps) {
  const [state, setState] = useState({
    modal: false,
  });
  const toggle = () => {
    setState((previous) => ({
      modal: !previous.modal,
    }));
  };

  const create = props.create;

  let title = `Editing new template`;

  let button = (
    <Button className="float-right" onClick={toggle}>
      Create new template
    </Button>
  );
  if (!create) {
    title = `Editing template <${props.formTemplate?.name}>`;
    button = <Button onClick={toggle}>Edit</Button>;
  }

  return (
    <Fragment>
      {button}
      <Modal isOpen={state.modal} toggle={toggle} animation="false">
        <ModalHeader
          toggle={toggle}
          cssModule={{ "modal-title": "overflow-hidden" }}
        >
          {title}
        </ModalHeader>

        <ModalBody>
          <TemplateForm
            resetState={props.resetState}
            toggle={toggle}
            formTemplate={props.formTemplate}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
