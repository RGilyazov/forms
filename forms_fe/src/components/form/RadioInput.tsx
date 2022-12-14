import React from "react";
import { Input, FormGroup, Label, FormFeedback } from "reactstrap";
import { FormUserInterfaceTypes } from "../../utils/formInterfaceTypes";

type RadioInputProps = {
  valueOnChange?: (index: number, value: string | number) => void;
  value: FormUserInterfaceTypes.FormValueWithVariants;
  index: number;
  readOnly: boolean;
  name: string;
  errorText?: string;
};
export default function RadioInput(props: RadioInputProps) {
  const { valueOnChange, value, index, readOnly, name, errorText } = props;
  const invalid = errorText ? true : false;
  return (
    <FormGroup tag="fieldset" name={name}>
      {value.values.map((cValue) => (
        <FormGroup check key={cValue.pk}>
          <Label check>
            <Input
              invalid={invalid}
              disabled={readOnly}
              checked={cValue.pk === value.value}
              type="radio"
              value={cValue.pk}
              name={`radio${index}`}
              onChange={(e) => {
                if (valueOnChange)
                  valueOnChange(index, parseInt(e.target.value));
              }}
            />
            {cValue.value}
          </Label>
        </FormGroup>
      ))}
      <Input invalid={invalid} hidden></Input>
      <FormFeedback>{errorText}</FormFeedback>
    </FormGroup>
  );
}
