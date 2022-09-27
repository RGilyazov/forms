import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import Form from "./Form";
import { FormAPITypes } from "../../api/formAppAPITypes";

type FormModalProps = {
  formTemplate: FormAPITypes.FormTemplate;
  resetState: () => void;
};

export default function FormModal(props: FormModalProps) {
  const [state, setState] = useState({
    modal: false,
  });

  const toggle = () => {
    setState((previous) => ({
      modal: !previous.modal,
    }));
  };

  const title = props.formTemplate.name;

  const button = (
    <Button className="float-right" onClick={toggle}>
      Fill
    </Button>
  );

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
          <Form
            toggle={toggle}
            formTemplate={props.formTemplate}
            resetState={props.resetState}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
