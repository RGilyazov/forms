import axios from "axios";
import { FormAPITypes } from "./formAppAPITypes";

const TEMPLATE_API_URL = "http://localhost:8000/forms_app/api/formTemplates";
const FORM_API_URL = "http://localhost:8000/forms_app/api/forms";

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
