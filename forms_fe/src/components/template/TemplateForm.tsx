import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import TemplateFieldList from "./TemplateFieldList";
import * as APILib from "../../api/formAppAPI";
import { FormAPITypes } from "../../api/formAppAPITypes";
import {
  validateTemplate,
  ValidateTemplateErrorsType,
} from "../../utils/formInterfaceUtils";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import { toast } from "react-toastify";

type TemplateFormProps = {
  formTemplate?: FormAPITypes.FormTemplate;
  resetState: () => void;
  toggle: () => void;
};

export default function TemplateForm(props: TemplateFormProps) {
  const initialState = { pk: 0, name: "", fields: [] };
  const [state, setState] = useState(props.formTemplate || initialState);
  const initialErrors: ValidateTemplateErrorsType = { fields: {} };
  const [errors, setErrors] = useState(initialErrors);

  const nameOnChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const formIsValid = validateTemplate(state, newErrors);
    setErrors(newErrors);
    return formIsValid;
  };

  const createFormTemplate: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (validateForm())
      APILib.postFormTemplate(state).then(() => {
        props.resetState();
        props.toggle();
      });
  };

  const editFormTemplate: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (validateForm())
      APILib.putFormTemplate(state)
        .then(() => {
          props.resetState();
          props.toggle();
        })
        .catch((err) => {
          toast.error("Unexpected error occurred. Please try again!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
  };
  const defaultIfEmpty = (value: string) => {
    return value === "" ? "" : value;
  };
  const addField = () => {
    const newField: FormAPITypes.FormField = {
      name: "",
      fieldType: FormAPITypes.FieldType.ST,
      values: [],
      pk: 0,
      formTemplate: props.formTemplate ? props.formTemplate.pk : 0,
    };

    setState({
      ...state,
      fields: [...state.fields, newField],
    });
  };
  const delField = (index: number) => {
    setState({
      ...state,
      fields: state.fields.filter((el, index_) => index !== index_),
    });
  };
  const fieldOnChange = (index: number, fieldName: string, value: string) => {
    const newState = {
      ...state,
      fields: state.fields.map((field, index_) => {
        return index_ !== index ? field : { ...field, [fieldName]: value };
      }),
    };
    setState(newState);
  };

  const addValue = (fieldIndex: number) => {
    setState({
      ...state,
      fields: state.fields.map((field, index_) => {
        return index_ !== fieldIndex
          ? field
          : {
              ...field,
              values: [
                ...field.values,
                { value: "", formField: field.pk, pk: 0 },
              ],
            };
      }),
    });
  };
  const delValue = (fieldIndex: number, valueIndex: number) => {
    setState({
      ...state,
      fields: state.fields.map((field, index_) => {
        return index_ !== fieldIndex
          ? field
          : {
              ...field,
              values: field.values.filter(
                (_, valueIndex_) => valueIndex_ !== valueIndex
              ),
            };
      }),
    });
  };
  const valueOnChange = (
    fieldIndex: number,
    valueIndex: number,
    newValue: string
  ) => {
    setState({
      ...state,
      fields: state.fields.map((field, index_) => {
        return index_ !== fieldIndex
          ? field
          : {
              ...field,
              values: field.values.map((value, valueIndex_) =>
                valueIndex_ !== valueIndex
                  ? value
                  : { ...value, value: newValue }
              ),
            };
      }),
    });
  };

  return (
    <Form onSubmit={props.formTemplate ? editFormTemplate : createFormTemplate}>
      <FormGroup>
        <Label for="name">Name:</Label>
        <Input
          invalid={Boolean(errors.name)}
          type="text"
          name="name"
          id="name"
          maxLength={80}
          onChange={nameOnChange}
          value={defaultIfEmpty(state.name)}
        />
        <FormFeedback>{errors.name as String}</FormFeedback>
      </FormGroup>
      <TemplateFieldList
        fields={state.fields}
        addField={addField}
        delField={delField}
        fieldOnChange={fieldOnChange}
        addValue={addValue}
        delValue={delValue}
        valueOnChange={valueOnChange}
        errors={errors.fields as { [key: string]: string }}
      />
      <div className="d-flex gap-3">
        <Button>Save</Button>
        {props.formTemplate ? (
          <ConfirmRemovalModal
            pk={props.formTemplate.pk}
            question="Do you really want delete the template?"
            resetState={props.resetState}
          />
        ) : (
          ""
        )}
      </div>
    </Form>
  );
}
