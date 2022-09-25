import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import TemplateFieldValueList from "./TemplateFieldValueList";

export default function TemplateFieldValueListModal(props) {
  const [state, setState] = useState({
    modal: false,
  });

  const toggle = () => {
    setState((previous) => ({
      modal: !previous.modal,
    }));
  };

  let title = "Editing form field values";
  let button = <Button onClick={toggle}>Edit</Button>;
  return (
    <Fragment>
      {button}
      <Modal isOpen={state.modal} toggle={toggle} animation="false">
        <ModalHeader toggle={toggle}>{title}</ModalHeader>

        <ModalBody>
          <TemplateFieldValueList
            fieldIndex={props.fieldIndex}
            values={props.values}
            addValue={props.addValue}
            delValue={props.delValue}
            valueOnChange={props.valueOnChange}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
}
