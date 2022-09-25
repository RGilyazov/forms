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
