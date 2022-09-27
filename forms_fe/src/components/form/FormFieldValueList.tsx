import React from "react";
import FormInput from "./FormInput";
import { FormUserInterfaceTypes } from "../../utils/formInterfaceTypes";

type FormFieldValueListProps = {
  readOnly?: boolean;
  errors?: { [key: string]: string };
  valueOnChange?: (index: number, value: string) => void;
  values: FormUserInterfaceTypes.FormValueWithVariants[];
};
export default function FormFieldValueList(props: FormFieldValueListProps) {
  const { values, valueOnChange, readOnly, errors } = props;

  return (
    <div className="mt-1">
      {!values || values.length <= 0 ? (
        <b>form has no fields</b>
      ) : (
        values.map((value, index) => (
          <FormInput
            key={index}
            readOnly={readOnly}
            name={`value${index}`}
            value={value}
            index={index}
            valueOnChange={valueOnChange}
            errorText={(errors && errors[index]) || ""}
          />
        ))
      )}
    </div>
  );
}
