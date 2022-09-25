import React from "react";
import { Table, Label } from "reactstrap";
import FormInput from "./FormInput";

export default function FormFieldValueList(props) {
  const values = props.values;
  const { valueOnChange, readOnly } = props;

  return (
    <Table className="mt-1">
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {!values || values.length <= 0 ? (
          <tr>
            <td colSpan="6" align="center">
              <b>form has no fields</b>
            </td>
          </tr>
        ) : (
          values.map((value, index) => (
            <tr key={value.pk || -index}>
              <td>
                <Label for={`value${index}`}>{value.name}</Label>
              </td>
              <td>
                <FormInput
                  readOnly={readOnly}
                  name={`value${index}`}
                  value={value}
                  index={index}
                  valueOnChange={valueOnChange}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
