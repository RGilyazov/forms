export namespace FormAPITypes {
  export enum FieldType {
    ST = "ST",
    NU = "NU",
    LS = "LS",
  }
  export type ListValue = { pk: number; value: string; formField: number };
  export type FormField = {
    pk: number;
    name: string;
    fieldType: FieldType;
    formTemplate: number;
    values: ListValue[];
  };
  export type FormTemplate = { pk: number; name: string; fields: FormField[] };

  export interface DBValue {
    stringValue: string | null;
    numberValue: number | null;
    listValue: number | null;
    fieldType: FieldType;
    valueAsString?: string;
  }
  export interface FormValue extends DBValue {
    pk?: number;
    name?: string;
    form?: number;
    formField: number;
  }

  export type Form = { pk: number; template: number; values: FormValue[] };
}
