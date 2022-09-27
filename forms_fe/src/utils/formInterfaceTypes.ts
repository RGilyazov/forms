import { FormAPITypes } from "../api/formAppAPITypes";

export namespace FormUserInterfaceTypes {
  export type FormValue = {
    value: string | number;
    fieldType: FormAPITypes.FieldType;
    name: string;
  };

  export interface FormValueWithVariants
    extends FormUserInterfaceTypes.FormValue {
    values: FormAPITypes.ListValue[];
  }
}
