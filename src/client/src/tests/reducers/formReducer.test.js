import formReducer, {
  setInput,
  clearForm,
  setFormError,
} from "../../store/Form.js";

describe("formReducer", () => {
  test("default values of formErrors and inputValues are empty", () => {
    expect(formReducer(undefined, { type: undefined })).toEqual({
      formErrors: {},
      inputValues: {},
    });
  });
  test("setInput updates inputValues", () => {
    // updates empty inputValues
    expect(formReducer(undefined, setInput({ mockProp: "mockValue" }))).toEqual(
      {
        formErrors: {},
        inputValues: { mockProp: "mockValue" },
      }
    );

    // updates non-empty inputValues
    expect(
      formReducer(
        {
          formErrors: {},
          inputValues: { mockProp1: "mockValue1" },
        },
        setInput({ mockProp: "mockValue" })
      )
    ).toEqual({
      formErrors: {},
      inputValues: { mockProp: "mockValue", mockProp1: "mockValue1" },
    });

    // removes prop from inputValues after receiving an empty string as it's value
    expect(
      formReducer(
        {
          formErrors: {},
          inputValues: { mockProp: "mockValue1" },
        },
        setInput({ mockProp: "" })
      )
    ).toEqual({
      formErrors: {},
      inputValues: {},
    });

    // changing inputValue removes it's error
    expect(
      formReducer(
        {
          formErrors: { mockProp: "mockValue1" },
          inputValues: { mockProp: "mockValue1" },
        },
        setInput({ mockProp: "mockValue" })
      )
    ).toEqual({
      formErrors: {},
      inputValues: { mockProp: "mockValue" },
    });
  });
  test("setFormError updates formErrors", () => {
    // updates empty formErrors
    expect(
      formReducer(undefined, setFormError({ error: "mockValue" }))
    ).toEqual({
      formErrors: { error: "mockValue" },
      inputValues: {},
    });

    // updates non-empty formErrors
    expect(
      formReducer(
        {
          formErrors: { error1: "mockValue1" },
          inputValues: {},
        },
        setFormError({ error: "mockValue" })
      )
    ).toEqual({
      formErrors: { error: "mockValue", error1: "mockValue1" },
      inputValues: {},
    });
  });
  test("clearForm removes all inputs and errors", () => {
    expect(
      formReducer(
        {
          formErrors: { error: "mockValue" },
          inputValues: { mockProp: "mockValue" },
        },
        clearForm()
      )
    ).toEqual({
      formErrors: {},
      inputValues: {},
    });
  });
});
