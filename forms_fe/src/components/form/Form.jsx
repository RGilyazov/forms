import React, { useState } from "react";
import { Button, Form as BootstrapForm, FormGroup } from "reactstrap";
import FormFieldValueList from "./FormFieldValueList";
import * as APILib from "../../api/formApAPI";
import { singleValueToDBValue } from "../../api/formFunctions";

export default function Form(props) {
  const initialState = {
    pk: 0,
    formTemplate: props.formTemplate,
    values: props.formTemplate.fields.map((field) => {
      return {
        value: "",
        field: field.pk,
        fieldType: field.fieldType,
        name: field.name,
        values: field.values,
      };
    }),
  };
  const [state, setState] = useState(initialState);

  const createForm = (e) => {
    e.preventDefault();
    const req = {
      pk: state.pk,
      template: state.formTemplate.pk,
      values: state.values.map((value) => {
        const dbValue = singleValueToDBValue(value.value, value.fieldType);
        return {
          pk: 0,
          formField: value.field,
          ...dbValue,
        };
      }),
    };
    APILib.postForm(req).then(() => {
      props.resetState();
      props.toggle();
    });
  };

  const valueOnChange = (index, newValue) => {
    const newState = {
      ...state,
      values: state.values.map((value, index_) => {
        return index_ !== index ? value : { ...value, value: newValue };
      }),
    };
    setState(newState);
  };

  return (
    <BootstrapForm onSubmit={createForm}>
      <FormGroup>
        <FormFieldValueList
          values={state.values}
          valueOnChange={valueOnChange}
        />
      </FormGroup>
      <Button>Save</Button>
    </BootstrapForm>
  );
}
