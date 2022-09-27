import React, { useState } from "react";
import { Button, Form as BootstrapForm, FormGroup } from "reactstrap";
import FormFieldValueList from "./FormFieldValueList";
import * as APILib from "../../api/formAppAPI";
import { FormAPITypes } from "../../api/formAppAPITypes";
import { FormUserInterfaceTypes } from "../../utils/formInterfaceTypes";
import {
  singleValueToDBValue,
  validateForm,
} from "../../utils/formInterfaceUtils";
import { toast } from "react-toastify";

type FormModalProps = {
  formTemplate: FormAPITypes.FormTemplate;
  toggle: () => void;
  resetState: () => void;
};
export default function Form(props: FormModalProps) {
  const initialState: {
    pk: number;
    formTemplate: FormAPITypes.FormTemplate;
    values: FormUserInterfaceTypes.FormValueWithVariants[];
  } = {
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
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (state.values.length > 0) validateForm(state.values, newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (validate()) {
      const req = {
        pk: state.pk,
        template: state.formTemplate.pk,

        values: state.values.map((value) => {
          const dbValue = singleValueToDBValue(value.value, value.fieldType);
          return {
            pk: 0,
            formField: Number(value.field),
            ...dbValue,
            fieldType: value.fieldType,
          };
        }),
      };
      APILib.postForm(req)
        .then(() => {
          props.resetState();
          props.toggle();
        })
        .catch((err) => {
          toast.error("Unexpected error occurred. Please try again!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  };

  const valueOnChange = (index: number, newValue: string | number) => {
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
          errors={errors}
        />
      </FormGroup>
      <Button>Save</Button>
    </BootstrapForm>
  );
}
