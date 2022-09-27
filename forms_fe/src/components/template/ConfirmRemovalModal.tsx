import React, { Fragment, useState } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

import * as APILib from "../../api/formAppAPI";

export default function ConfirmRemovalModal(props: {
  pk: number;
  resetState: () => void;
  question: string;
}) {
  const [state, setState] = useState({
    modal: false,
  });

  const toggle = () => {
    setState((previous) => ({
      modal: !previous.modal,
    }));
  };

  const deleteFormTemplate = (pk: number) => {
    APILib.deleteFormTemplate(pk)
      .then(() => {
        props.resetState();
        toggle();
      })
      .catch((err) => {
        toast.error("Unexpected error occurred. Please try again!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  return (
    <Fragment>
      <Button color="danger" onClick={() => toggle()}>
        Delete
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
