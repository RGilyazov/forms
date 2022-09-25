import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TemplateModal from "../components/template/TemplateModal";
import axios from "axios";
import { EXPORT_FOR_TESTING } from "../api/formApAPI";

jest.mock("axios");

test("renders TemplateModal create = true", () => {
  const resetState = jest.fn();
  render(<TemplateModal create={true} resetState={resetState} />);
  const button = screen.getByText("Create new template");
  const label = screen.queryByText("Editing new template");
  expect(button).toBeInTheDocument();
  expect(label).toBeNull();
});

test("opens TemplateModal", () => {
  const resetState = jest.fn();
  render(<TemplateModal create={true} resetState={resetState} />);
  const button = screen.getByText("Create new template");
  fireEvent.click(button);
  const label = screen.getByText("Editing new template");
  expect(label).toBeInTheDocument();
});

test("post template data", async () => {
  const resetState = jest.fn();
  render(<TemplateModal create={true} resetState={resetState} />);
  const button = screen.getByText("Create new template");
  fireEvent.click(button);
  const label = screen.getByText("Editing new template");
  expect(label).toBeInTheDocument();
  let input = await screen.findByLabelText("Name:");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { name: "name", value: "Hello world!" } });
  input = await screen.findByLabelText("Name:");
  expect(input.value).toBe("Hello world!");
  const saveButton = screen.getByText("Save");
  expect(saveButton).toBeInTheDocument();
  axios.post.mockImplementationOnce(() => Promise.resolve({}));
  fireEvent.click(saveButton);
  expect(axios.post).toBeCalledTimes(1);
  const expectedData = { fields: [], name: "Hello world!", pk: 0 };
  expect(axios.post).toBeCalledWith(
    EXPORT_FOR_TESTING.TEMPLATE_API_URL,
    expectedData
  );
});

test("template empty name validation", async () => {
  const resetState = jest.fn();
  render(<TemplateModal create={true} resetState={resetState} />);
  const button = screen.getByText("Create new template");
  fireEvent.click(button);
  const saveButton = screen.getByText("Save");
  expect(saveButton).toBeInTheDocument();
  fireEvent.click(saveButton);
  const errorMessage = screen.getByText("Name should not be empty");
  expect(errorMessage).toBeInTheDocument();
});

test("put template data", async () => {
  const resetState = jest.fn();
  const formTemplateData = {
    pk: 12,
    name: "<template name>",
    fields: [
      {
        pk: 20,
        name: "st",
        fieldType: "ST",
        formTemplate: 12,
        values: [],
      },
    ],
  };
  render(
    <TemplateModal
      create={false}
      resetState={resetState}
      formTemplate={formTemplateData}
    />
  );
  const button = screen.getByText("Edit");
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  let input = await screen.findByLabelText("Name:");
  expect(input.value).toBe("<template name>");
  const saveButton = screen.getByText("Save");
  expect(saveButton).toBeInTheDocument();
  axios.put.mockImplementationOnce(() => Promise.resolve({}));
  fireEvent.click(saveButton);
  expect(axios.put).toBeCalledTimes(1);
  expect(axios.put).toBeCalledWith(
    EXPORT_FOR_TESTING.TEMPLATE_API_URL + "/12/",
    formTemplateData
  );
});
