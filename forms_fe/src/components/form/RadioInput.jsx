import React from "react";
import { Input, FormGroup, Label } from "reactstrap";

export default function RadioInput(props) {
  const { valueOnChange, value, index, readOnly, name } = props;
  return (
    <FormGroup tag="fieldset" name={name}>
      {value.values.map((cValue) => (
        <FormGroup check key={cValue.pk}>
          <Label check>
            <Input
              disabled={readOnly}
              checked={cValue.pk === value.value}
              type="radio"
              value={cValue.pk}
              name={`radio${index}`}
              onChange={(e) => {
                valueOnChange(index, parseInt(e.target.value));
              }}
            />
            {cValue.value}
          </Label>
        </FormGroup>
      ))}
    </FormGroup>
  );
}
