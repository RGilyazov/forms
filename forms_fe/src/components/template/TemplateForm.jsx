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
import * as APILib from "../../api/formApAPI";
import { validateTemplate } from "../../api/formFunctions";

export default function TemplateForm(props) {
  const initialState = { pk: 0, name: "", fields: [] };
  const [state, setState] = useState(props.formTemplate || initialState);
  const [errors, setErrors] = useState({ fields: {} });

  const nameOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const formIsValid = validateTemplate(state, newErrors);
    setErrors(newErrors);
    return formIsValid;
  };

  const createFormTemplate = (e) => {
    e.preventDefault();
    if (validateForm())
      APILib.postFormTemplate(state).then(() => {
        props.resetState();
        props.toggle();
      });
  };

  const editFormTemplate = (e) => {
    e.preventDefault();
    if (validateForm())
      APILib.putFormTemplate(state).then(() => {
        props.resetState();
        props.toggle();
      });
  };
  const defaultIfEmpty = (value) => {
    return value === "" ? "" : value;
  };
  const addField = (e) => {
    setState({
      ...state,
      fields: [...state.fields, { name: "", fieldType: "ST", values: [] }],
    });
  };
  const delField = (index) => {
    setState({
      ...state,
      fields: state.fields.filter((el, index_) => index !== index_),
    });
  };
  const fieldOnChange = (index, fieldName, value) => {
    const newState = {
      ...state,
      fields: state.fields.map((field, index_) => {
        return index_ !== index ? field : { ...field, [fieldName]: value };
      }),
    };
    setState(newState);
  };

  const addValue = (fieldIndex) => {
    setState({
      ...state,
      fields: state.fields.map((field, index_) => {
        return index_ !== fieldIndex
          ? field
          : {
              ...field,
              values: [...field.values, { value: "", formField: field.pk }],
            };
      }),
    });
  };
  const delValue = (fieldIndex, valueIndex) => {
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
  const valueOnChange = (fieldIndex, valueIndex, newValue) => {
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
          maxLength="80"
          onChange={nameOnChange}
          value={defaultIfEmpty(state.name)}
        />
        <FormFeedback>{errors.name}</FormFeedback>
        <TemplateFieldList
          fields={state.fields}
          addField={addField}
          delField={delField}
          fieldOnChange={fieldOnChange}
          addValue={addValue}
          delValue={delValue}
          valueOnChange={valueOnChange}
          errors={errors.fields}
        />
      </FormGroup>
      <Button>Save</Button>
    </Form>
  );
}
