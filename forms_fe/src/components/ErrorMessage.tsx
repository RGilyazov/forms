import React from "react";

type ErrorMessageProps = { message: string; error: any };

function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div className="d-flex flex-column align-items-center m-5">
      <div className="alert alert-danger" role="alert">
        {props.message}
      </div>
      <div> {`${props.error}`}</div>
    </div>
  );
}

export default ErrorMessage;
