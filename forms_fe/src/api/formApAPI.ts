import axios from "axios";

const TEMPLATE_API_URL = "http://localhost:8000/forms_app/api/formTemplates";
const FORM_API_URL = "http://localhost:8000/forms_app/api/forms";

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

export function getFormTemplates(): Promise<{
  data: FormAPITypes.FormTemplate[];
}> {
  return axios.get(TEMPLATE_API_URL);
}

export function postFormTemplate(formTemplate: FormAPITypes.FormTemplate) {
  return axios.post(TEMPLATE_API_URL, formTemplate);
}

export function putFormTemplate(formTemplate: FormAPITypes.FormTemplate) {
  return axios.put(
    TEMPLATE_API_URL + "/" + formTemplate.pk + "/",
    formTemplate
  );
}

export function deleteFormTemplate(pk: number) {
  return axios.delete(TEMPLATE_API_URL + "/" + pk + "/");
}

export function getForms(): Promise<{
  data: FormAPITypes.Form[];
}> {
  return axios.get(FORM_API_URL);
}

export function postForm(form: FormAPITypes.Form) {
  return axios.post(FORM_API_URL, form);
}

export const EXPORT_FOR_TESTING = { TEMPLATE_API_URL, FORM_API_URL };
