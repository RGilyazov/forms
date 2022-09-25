import React, { Fragment, useState } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import * as APILib from "../../api/formApAPI";

export default function ConfirmRemovalModal(props) {
  const [state, setState] = useState({
    modal: false,
  });

  const toggle = () => {
    setState((previous) => ({
      modal: !previous.modal,
    }));
  };

  const deleteFormTemplate = (pk) => {
    APILib.deleteFormTemplate(pk).then(() => {
      props.resetState();
      toggle();
    });
  };

  return (
    <Fragment>
      <Button color="danger" onClick={() => toggle()}>
        Remove
      </Button>
      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{props.question}</ModalHeader>

        <ModalFooter>
          <Button type="button" onClick={() => toggle()}>
            Cancel
          </Button>
          <Button
            type="button"
            color="primary"
            onClick={() => deleteFormTemplate(props.pk)}
          >
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
