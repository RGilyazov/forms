import React from "react";
import { Table, Input, Button } from "reactstrap";

export default function TemplateFieldValueList(props) {
  const values = props.values;
  const { addValue, delValue, valueOnChange } = props;

  return (
    <Table className="mt-1">
      <thead>
        <tr>
          <th>Value</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!values || values.length <= 0 ? (
          <tr>
            <td colSpan="6" align="center">
              <b>no values added yet</b>
            </td>
          </tr>
        ) : (
          values.map((value, valueIndex) => (
            <tr key={value.pk || valueIndex}>
              <td>
                <Input
                  type="text"
                  name="value"
                  onChange={(e) => {
                    valueOnChange(props.fieldIndex, valueIndex, e.target.value);
                  }}
                  value={value.value}
                />
              </td>
              <td>
                <Button
                  color="danger"
                  className="float-right"
                  onClick={() => {
                    delValue(props.fieldIndex, valueIndex);
                  }}
                >
                  del
                </Button>
              </td>
            </tr>
          ))
        )}
        <tr>
          <td>
            <Button
              className="float-right me-2"
              onClick={() => {
                addValue(props.fieldIndex);
              }}
            >
              Add
            </Button>
            <Button className="float-right" onClick={props.toggle}>
              OK
            </Button>
          </td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
}
