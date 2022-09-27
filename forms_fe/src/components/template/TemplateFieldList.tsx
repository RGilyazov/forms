import React from "react";
import { Table, Input, Button, FormFeedback } from "reactstrap";
import TemplateFieldValueListModal from "./fieldValueList/TemplateFieldValueListModal";
import { FormAPITypes } from "../../api/formAppAPITypes";

type TemplateFieldListProps = {
  fields: FormAPITypes.FormField[];
  errors: { [key: string]: string };
  addField: () => void;
  delField: (index: number) => void;
  fieldOnChange: (index: number, fieldName: string, value: string) => void;
  addValue: (fieldIndex: number) => void;
  delValue: (fieldIndex: number, valueIndex: number) => void;
  valueOnChange: (
    fieldIndex: number,
    valueIndex: number,
    newValue: string
  ) => void;
};
export default function TemplateFieldList(props: TemplateFieldListProps) {
  const { fields, addField, delField, fieldOnChange, errors } = props;

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
            <td colSpan={6} align="center">
              <b>no fields added yet</b>
            </td>
          </tr>
        ) : (
          fields.map((field, index) => (
            <tr key={field.pk || -index}>
              <td>
                <Input
                  invalid={Boolean(errors[index])}
                  type="text"
                  name="name"
                  onChange={(e) => {
                    fieldOnChange(index, e.target.name, e.target.value);
                  }}
                  value={field.name}
                />
                <FormFeedback>{errors[String(index)]}</FormFeedback>
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
                  <option value={FormAPITypes.FieldType.ST}>string</option>
                  <option value={FormAPITypes.FieldType.NU}>number</option>
                  <option value={FormAPITypes.FieldType.LS}>list</option>
                </select>
              </td>
              <td>
                {field.fieldType === FormAPITypes.FieldType.LS ? (
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
