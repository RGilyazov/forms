import React, { useState, useEffect } from "react";
import FormFieldValueList from "./FormFieldValueList";
import * as APILib from "../../api/formApAPI";
import { dbValueToSingleValue } from "../../api/formFunctions";

export default function FormList(props) {
  const readOnly = { props };
  const [state, setState] = useState({
    forms: [],
  });

  const getForms = () => {
    APILib.getForms().then((res) => {
      setState({
        forms: res.data,
      });
    });
  };

  useEffect(() => {
    getForms();
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      {state.forms.map((form) => (
        <div key={form.pk}>
          <h2>{`Form:${form.template}`}</h2>
          <FormFieldValueList
            readOnly={readOnly}
            values={form.values.map((value) => {
              return { ...value, value: dbValueToSingleValue(value) };
            })}
          ></FormFieldValueList>
        </div>
      ))}
    </div>
  );
}
