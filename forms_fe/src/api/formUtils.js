export const FIELD_TYPES = { NU: "NU", LS: "LS", ST: "ST" };

export function dbValueToSingleValue(dbValue) {
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

export function singleValueToDBValue(singleValue, fieldType) {
  return {
    stringValue: fieldType === FIELD_TYPES.ST ? singleValue : null,
    numberValue: fieldType === FIELD_TYPES.NU ? singleValue : null,
    listValue: fieldType === FIELD_TYPES.LS ? singleValue : null,
  };
}

export function validateForm(formValues, errors) {
  formValues.forEach((value, index) => {
    if (value.fieldType === FIELD_TYPES.ST && !value.value) {
      errors[index] = "please enter at least 1 symbol here";
    }
    if (value.fieldType === FIELD_TYPES.LS && !value.value) {
      errors[index] = "please select one variant";
    }
    if (
      value.fieldType === FIELD_TYPES.NU &&
      (isNaN(value.value) || value.value === "")
    ) {
      errors[index] = "please enter valid number";
    }
  });
  return Object.keys(errors).length === 0;
}

export function validateTemplate(template, errors) {
  if (!template.name) {
    errors.name = "Name should not be empty";
  }
  errors.fields = {};
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
    if (error.length > 0) errors.fields[index] = error.join(" ");
  });
  return (
    Object.keys(errors).length === 1 && Object.keys(errors.fields).length === 0
  );
}
