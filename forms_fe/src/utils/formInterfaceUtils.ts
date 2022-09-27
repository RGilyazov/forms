import { FormAPITypes } from "../api/formAppAPITypes";
import { FormUserInterfaceTypes } from "./formInterfaceTypes";

export const FIELD_TYPES = { NU: "NU", LS: "LS", ST: "ST" };

export function dbValueToSingleValue(dbValue: FormAPITypes.DBValue) {
  switch (dbValue.fieldType) {
    case FIELD_TYPES.NU:
      return dbValue.numberValue ? dbValue.numberValue : "";
    case FIELD_TYPES.LS:
      return dbValue.valueAsString ? dbValue.valueAsString : "";
    case FIELD_TYPES.ST:
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
    stringValue: fieldType === FIELD_TYPES.ST ? String(singleValue) : null,
    numberValue: fieldType === FIELD_TYPES.NU ? Number(singleValue) : null,
    listValue: fieldType === FIELD_TYPES.LS ? Number(singleValue) : null,
  };
}
export function validateForm(
  formValues: FormUserInterfaceTypes.FormValue[],
  errors: { [key: string]: string }
) {
  formValues.forEach((value, index) => {
    if (value.fieldType === FIELD_TYPES.ST && !value.value) {
      errors[index.toString()] = "please enter at least 1 symbol here";
    }
    if (value.fieldType === FIELD_TYPES.LS && !value.value) {
      errors[index.toString()] = "please select one variant";
    }
    if (
      value.fieldType === FIELD_TYPES.NU &&
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
    if (field.fieldType === FIELD_TYPES.LS) {
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
