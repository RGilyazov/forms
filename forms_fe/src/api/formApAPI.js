import axios from "axios";

const TEMPLATE_API_URL = "http://localhost:8000/forms_app/api/formTemplates";
const FORM_API_URL = "http://localhost:8000/forms_app/api/forms";

export function getFormTemplates() {
  return axios.get(TEMPLATE_API_URL);
}

export function postFormTemplate(formTemplate) {
  return axios.post(TEMPLATE_API_URL, formTemplate);
}

export function putFormTemplate(formTemplate) {
  return axios.put(
    TEMPLATE_API_URL + "/" + formTemplate.pk + "/",
    formTemplate
  );
}

export function deleteFormTemplate(pk) {
  return axios.delete(TEMPLATE_API_URL + "/" + pk + "/");
}

export function getForms() {
  return axios.get(FORM_API_URL);
}

export function postForm(form) {
  return axios.post(FORM_API_URL, form);
}

export const EXPORT_FOR_TESTING = { TEMPLATE_API_URL, FORM_API_URL };
