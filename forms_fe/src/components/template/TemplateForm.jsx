import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import TemplateFieldList from "./TemplateFieldList";
import * as APILib from "../../api/formApAPI";

export default function TemplateForm(props) {
  const initialState = { pk: 0, name: "", fields: [] };
  const [state, setState] = useState(props.formTemplate || initialState);

  const nameOnChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const createFormTemplate = (e) => {
    e.preventDefault();
    APILib.postFormTemplate(state).then(() => {
      props.resetState();
      props.toggle();
    });
  };

  const editFormTemplate = (e) => {
    e.preventDefault();
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
  const valueOnChange = (fieldIndex, valueIndex, NewValue) => {
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
                  : { ...value, value: NewValue }
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
          type="text"
          name="name"
          maxLength="80"
          onChange={nameOnChange}
          value={defaultIfEmpty(state.name)}
        />
        <TemplateFieldList
          fields={state.fields}
          addField={addField}
          delField={delField}
          fieldOnChange={fieldOnChange}
          addValue={addValue}
          delValue={delValue}
          valueOnChange={valueOnChange}
        />
      </FormGroup>
      <Button>Save</Button>
    </Form>
  );
}
