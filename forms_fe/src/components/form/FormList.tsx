import React, { useState, useEffect } from "react";
import FormFieldValueList from "./FormFieldValueList";
import * as APILib from "../../api/formAppAPI";
import { FormAPITypes } from "../../api/formAppAPITypes";
import { dbValueToSingleValue } from "../../utils/formInterfaceUtils";
import { Spinner } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

type FormListProps = { readOnly: boolean };

export default function FormList({ readOnly }: FormListProps) {
  const initialState: { forms: FormAPITypes.Form[] | undefined } = {
    forms: undefined,
  };
  const [state, setState] = useState(initialState);

  const [error, setError] = useState(null);

  const getForms = () => {
    APILib.getForms()
      .then((res) => {
        setState({
          forms: res.data,
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    getForms();
  }, []);

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center m-5">
        <div className="alert alert-danger" role="alert">
          Error occurred during loading. Try to reload the page.
        </div>
        <div> {`${error}`}</div>
      </div>
    );
  }
  if (state.forms === undefined)
    return (
      <div className="d-flex flex-column align-items-center m-5">
        <Spinner></Spinner>
        Loading...
      </div>
    );

  return (
    <div style={{ marginTop: "20px" }}>
      {state.forms.map((form) => (
        <div key={form.pk}>
          <h2>{`Form:${form.template}`}</h2>
          <FormFieldValueList
            readOnly={readOnly}
            values={form.values.map((value) => {
              return {
                ...value,
                value: dbValueToSingleValue(value),
                values: [],
                name: value.name || "",
              };
            })}
          ></FormFieldValueList>
        </div>
      ))}
    </div>
  );
}
