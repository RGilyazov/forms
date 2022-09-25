import React from "react";
import { Input } from "reactstrap";
import { FIELD_TYPES } from "../../api/formFunctions";
import RadioInput from "./RadioInput";

export default function FormInput(props) {
  const { valueOnChange, value, index, name, readOnly } = props;
  if (value.fieldType === FIELD_TYPES.LS && !readOnly && value.values)
    return (
      <RadioInput
        valueOnChange={valueOnChange}
        value={value}
        index={index}
        name={name}
        readOnly={readOnly}
      />
    );
  const inputType = value.fieldType === FIELD_TYPES.NU ? "number" : "text";

  return (
    <Input
      disabled={readOnly}
      type={inputType}
      name={name}
      onChange={(e) => {
        valueOnChange(index, e.target.value);
      }}
      value={value.value}
    />
  );
}
