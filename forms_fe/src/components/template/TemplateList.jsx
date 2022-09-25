import React from "react";
import { Table } from "reactstrap";
import TemplateModal from "./TemplateModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import FormModal from "../form/FormModal";

export default function TemplateList(props) {
  const formTemplates = props.formTemplates;
  return (
    <Table className="table w-auto">
      <thead>
        <tr>
          <th>Template name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!formTemplates || formTemplates.length <= 0 ? (
          <tr>
            <td colSpan="6" align="center">
              <b>no forms added yet</b>
            </td>
          </tr>
        ) : (
          formTemplates.map((formTemplate) => (
            <tr key={formTemplate.pk}>
              <td style={{ minWidth: 300 }}>{formTemplate.name}</td>
              <td>
                <FormModal
                  formTemplate={formTemplate}
                  resetState={props.resetState}
                />
                &nbsp;&nbsp;
                <TemplateModal
                  create={false}
                  formTemplate={formTemplate}
                  resetState={props.resetState}
                />
                &nbsp;&nbsp;
                <ConfirmRemovalModal
                  pk={formTemplate.pk}
                  question="Do you really want delete the template?"
                  resetState={props.resetState}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}
