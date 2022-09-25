import React from "react";
import FormInput from "./FormInput";

export default function FormFieldValueList(props) {
  const { values, valueOnChange, readOnly, errors } = props;

  return (
    <div className="mt-1">
      {!values || values.length <= 0 ? (
        <b>form has no fields</b>
      ) : (
        values.map((value, index) => (
          <FormInput
            key={value.pk || -index}
            readOnly={readOnly}
            name={`value${index}`}
            value={value}
            index={index}
            valueOnChange={valueOnChange}
            errorText={errors && errors[index]}
          />
        ))
      )}
    </div>
  );
}
