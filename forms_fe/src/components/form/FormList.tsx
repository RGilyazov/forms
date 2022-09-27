import React, { useState, useEffect } from "react";
import FormFieldValueList from "./FormFieldValueList";
import * as APILib from "../../api/formAppAPI";
import { FormAPITypes } from "../../api/formAppAPITypes";
import { dbValueToSingleValue } from "../../utils/formInterfaceUtils";

type FormListProps = { readOnly: boolean };

export default function FormList({ readOnly }: FormListProps) {
  const initialState: { forms: FormAPITypes.Form[] } = { forms: [] };
  const [state, setState] = useState(initialState);

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
