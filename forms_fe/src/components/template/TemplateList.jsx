import React from "react";
import { Table } from "reactstrap";
import TemplateModal from "./TemplateModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import FormModal from "../form/FormModal";

export default function TemplateList(props) {
  const formTemplates = props.formTemplates;
  return (
    <Table className="w-auto mb-0">
      <thead>
        <tr>
          <th>Template name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!formTemplates || formTemplates.length <= 0 ? (
          <tr>
            <td colSpan="2" align="center">
              <b>no forms added yet</b>
            </td>
          </tr>
        ) : (
          formTemplates.map((formTemplate) => (
            <tr className="d-flex" key={formTemplate.pk}>
              <td style={{ minWidth: 300 }}>{formTemplate.name}</td>
              <td className="d-flex gap-3 justify-content-end">
                <FormModal
                  formTemplate={formTemplate}
                  resetState={props.resetState}
                />
                <TemplateModal
                  create={false}
                  formTemplate={formTemplate}
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
