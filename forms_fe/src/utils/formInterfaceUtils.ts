import { FormAPITypes } from "../api/formAppAPITypes";
import { FormUserInterfaceTypes } from "./formInterfaceTypes";

export function dbValueToSingleValue(dbValue: FormAPITypes.DBValue) {
  switch (dbValue.fieldType) {
    case FormAPITypes.FieldType.NU:
      return dbValue.numberValue ? dbValue.numberValue : "";
    case FormAPITypes.FieldType.LS:
      return dbValue.valueAsString ? dbValue.valueAsString : "";
    case FormAPITypes.FieldType.ST:
      return dbValue.stringValue ? dbValue.stringValue : "";
    default:
      throw new Error(`unknown fieldType ${dbValue.fieldType}`);
  }
}

export function singleValueToDBValue(
  singleValue: number | string | null,
  fieldType: FormAPITypes.FieldType
) {
  return {
    stringValue:
      fieldType === FormAPITypes.FieldType.ST ? String(singleValue) : null,
    numberValue:
      fieldType === FormAPITypes.FieldType.NU ? Number(singleValue) : null,
    listValue:
      fieldType === FormAPITypes.FieldType.LS ? Number(singleValue) : null,
  };
}
export function validateForm(
  formValues: FormUserInterfaceTypes.FormValue[],
  errors: { [key: string]: string }
) {
  formValues.forEach((value, index) => {
    if (value.fieldType === FormAPITypes.FieldType.ST && !value.value) {
      errors[index.toString()] = "please enter at least 1 symbol here";
    }
    if (value.fieldType === FormAPITypes.FieldType.LS && !value.value) {
      errors[index.toString()] = "please select one variant";
    }
    if (
      value.fieldType === FormAPITypes.FieldType.NU &&
      (isNaN(Number(value.value)) || value.value === "")
    ) {
      errors[index.toString()] = "please enter valid number";
    }
  });
  return Object.keys(errors).length === 0;
}

export type ValidateTemplateErrorsType = {
  [key: string]: string | { [key: string]: string };
};

export function validateTemplate(
  template: FormAPITypes.FormTemplate,
  errors: ValidateTemplateErrorsType
) {
  if (!template.name) {
    errors.name = "Name should not be empty";
  }
  const fields: { [key: string]: string } = {};
  template.fields.forEach((field, index) => {
    const error = [];
    if (!field.name) {
      error.push("Field name should not be empty.");
    }
    if (field.fieldType === FormAPITypes.FieldType.LS) {
      if (field.values.length < 3)
        error.push("You need to enter at least 3 variants.");
      if (field.values.length > 10)
        error.push(" You can enter maximum 10 variants.");
    }
    if (error.length > 0) fields[index.toString()] = error.join(" ");
  });
  errors.fields = fields;
  return (
    Object.keys(errors).length === 1 && Object.keys(errors.fields).length === 0
  );
}
