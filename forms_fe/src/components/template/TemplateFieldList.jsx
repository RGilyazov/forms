import React from "react";
import { Table, Input, Button } from "reactstrap";
import TemplateFieldValueListModal from "./fieldValueList/TemplateFieldValueListModal";
import { FIELD_TYPES } from "../../api/formFunctions";

export default function TemplateFieldList(props) {
  const fields = props.fields;
  const { addField, delField, fieldOnChange } = props;

  return (
    <Table className="mt-1">
      <thead>
        <tr>
          <th>Name</th>
          <th>type</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!fields || fields.length <= 0 ? (
          <tr>
            <td colSpan="6" align="center">
              <b>no fields added yet</b>
            </td>
          </tr>
        ) : (
          fields.map((field, index) => (
            <tr key={field.pk || -index}>
              <td>
                <Input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    fieldOnChange(index, e.target.name, e.target.value);
                  }}
                  value={field.name}
                />
              </td>
              <td>
                <select
                  className="form-control"
                  value={field.fieldType}
                  name="fieldType"
                  onChange={(e) => {
                    fieldOnChange(index, e.target.name, e.target.value);
                  }}
                >
                  <option value={FIELD_TYPES.ST}>string</option>
                  <option value={FIELD_TYPES.NU}>number</option>
                  <option value={FIELD_TYPES.LS}>list</option>
                </select>
              </td>
              <td>
                {field.fieldType === FIELD_TYPES.LS ? (
                  <TemplateFieldValueListModal
                    fieldIndex={index}
                    values={field.values}
                    addValue={props.addValue}
                    delValue={props.delValue}
                    valueOnChange={props.valueOnChange}
                  />
                ) : (
                  ""
                )}
              </td>
              <td>
                <Button
                  color="danger"
                  className="float-right"
                  onClick={() => {
                    delField(index);
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
            <Button className="float-right" onClick={addField}>
              Create New field
            </Button>
          </td>
          <td> </td>
          <td> </td>
        </tr>
      </tbody>
    </Table>
  );
}
