import * as R from "ramda";
import React from "react";
import { screen, fireEvent, cleanup } from "@testing-library/react";
import { renderWithProviders } from "../util/storeSetUp.js";
import Form from "../../components/Form.js";
import moduleDescriptions from "../../descriptions/modules/index.js";
import { EVENTS_FORM_MODULE_ID } from "../../constants/moduleIds.js";
import { mapPromise } from "../../util/ramdaPlus.js";
import "@testing-library/jest-dom";

const popoulateForm = (inputs, values) =>
  inputs.map((input, index) =>
    fireEvent.change(input, { target: { value: values[index] } })
  );

describe("eventsForm", () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => ({
      json: () => {
        return {};
      },
    }));
  });
  afterEach(() => cleanup)
  afterAll(() => {
    jest.restoreAllMocks();
  });
  const componentProps = R.prop(EVENTS_FORM_MODULE_ID, moduleDescriptions);
  const inputLabels = R.pipe(
    R.prop("fields"),
    R.pluck("label")
  )(componentProps);
  const submitLabels = R.pipe(
    R.prop("submits"),
    R.pluck("label")
  )(componentProps);
  test("all inputs and submits are rendered", () => {
    renderWithProviders(<Form {...componentProps} />);
    const inputs = inputLabels.map((label) => screen.getByLabelText(label));
    const submits = submitLabels.map((label) =>
      screen.getByRole("button", {
        name: label,
      })
    );

    expect(inputs.length).toEqual(4);
    expect(submits.length).toEqual(2);
  });
  test("submitting empty form results in display of required errors", () => {
    renderWithProviders(<Form {...componentProps} />);
    const submitButton = screen.getByRole("button", {
      name: "Add event",
    });
    fireEvent.click(submitButton);
    const requiredErrors = inputLabels.map((label) =>
      screen.getByText(`${label} is required`)
    );

    expect(requiredErrors.length).toEqual(4);
  });
  test("email field throws a pattern error", () => {
    renderWithProviders(<Form {...componentProps} />);
    const emailInput = screen.getByLabelText("Email");
    const submitButton = screen.getByRole("button", {
      name: "Add event",
    });

    fireEvent.change(emailInput, { target: { value: "mockValue" } });
    fireEvent.click(submitButton);
    const patternError = screen.getByText(`Provide a valid email`);

    expect(patternError).toBeInTheDocument();
  });
  test("changing field's value removes it's error", () => {
    renderWithProviders(<Form {...componentProps} />);
    const input = screen.getByLabelText(inputLabels[0]);
    const submitButton = screen.getByRole("button", {
      name: "Add event",
    });

    fireEvent.click(submitButton);
    const errorPre = screen.getByText(`${inputLabels[0]} is required`);
    expect(errorPre).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "mockValue" } });
    const errorPost = screen.queryByText(`${inputLabels[0]} is required`);
    expect(errorPost).toBeNull();
  });
  test("clearing the form removes all input values and errors", () => {
    renderWithProviders(<Form {...componentProps} />);
    const inputs = inputLabels.map((label) => screen.getByLabelText(label));
    const formValues = ["mockName", "mockName", "mockEmail", "2022-01-01"];
    const resetButton = screen.getByRole("button", {
      name: "Reset Form",
    });
    const submitButton = screen.getByRole("button", {
      name: "Add event",
    });
    popoulateForm(inputs, formValues);
    inputs.map((input, index) =>
      expect(input.value).toEqual(formValues[index])
    );

    fireEvent.click(submitButton);
    const emailPatternErrorPre = screen.getByText(`Provide a valid email`);
    expect(emailPatternErrorPre).toBeInTheDocument();

    fireEvent.click(resetButton);
    inputs.map((input) => expect(input.value).toEqual(""));
    const emailPatternErrorPost = screen.queryByText(`Provide a valid email`);
    expect(emailPatternErrorPost).toBeNull();
  });
  test("successfully submitting form", async () => {
    renderWithProviders(<Form {...componentProps} />);
    const inputsPre = inputLabels.map((label) => screen.getByLabelText(label));
    const formValues = [
      "mockName",
      "mockName",
      "mockEmail@email.com",
      "2022-01-01",
    ];

    const submitButton = screen.getByRole("button", {
      name: "Add event",
    });

    popoulateForm(inputsPre, formValues);
    fireEvent.click(submitButton);

    const inputsPost = await mapPromise(
      async (label) => await screen.findByLabelText(label),
      inputLabels
    );

    inputsPost.map((input) => expect(input.value).toEqual(""));
    const emailPatternErrorPost = screen.queryByText(`Provide a valid email`);
    expect(emailPatternErrorPost).toBeNull();
  });
});
