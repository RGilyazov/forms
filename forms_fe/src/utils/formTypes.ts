import { FormAPITypes } from "../api/formApAPI";

export namespace FormUserInterfaceTypes {
  export type FormValue = {
    value: string | number;
    fieldType: FormAPITypes.FieldType;
  };

  export interface FormValueWithVariants
    extends FormAPITypes.FormValue,
      FormUserInterfaceTypes.FormValue {
    values: FormAPITypes.ListValue[];
  }
}
