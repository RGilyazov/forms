import React from "react";
import { Input, FormGroup, Label, FormFeedback } from "reactstrap";
import RadioInput from "./RadioInput";
import { FormUserInterfaceTypes } from "../../utils/formInterfaceTypes";
import { FormAPITypes } from "../../api/formAppAPITypes";

type FormInputProps = {
  valueOnChange?: (index: number, value: string | number) => void;
  value: FormUserInterfaceTypes.FormValueWithVariants;
  index: number;
  name: string;
  readOnly?: boolean;
  errorText: string;
};

export default function FormInput(props: FormInputProps) {
  const { valueOnChange, value, index, name, readOnly, errorText } = props;
  let input;
  if (
    value.fieldType === FormAPITypes.FieldType.LS &&
    !readOnly &&
    value.values
  )
    input = (
      <RadioInput
        valueOnChange={valueOnChange}
        value={value}
        index={index}
        name={name}
        readOnly={readOnly || false}
        errorText={errorText}
      />
    );
  else {
    const invalid = errorText ? true : false;
    const inputType =
      value.fieldType === FormAPITypes.FieldType.NU ? "number" : "text";
    input = (
      <Input
        maxLength={50}
        disabled={readOnly}
        type={inputType}
        name={name}
        onChange={(e) => {
          if (valueOnChange) valueOnChange(index, e.target.value);
        }}
        value={value.value}
        invalid={invalid}
      />
    );
  }
  return (
    <FormGroup>
      <Label for={`value${index}`}>{value.name}</Label>
      {input}
      <FormFeedback>{errorText}</FormFeedback>
    </FormGroup>
  );
}
