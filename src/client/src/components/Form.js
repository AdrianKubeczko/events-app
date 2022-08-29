import React, { useEffect } from "react";
import * as R from "ramda";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setInput, clearForm } from "../store/Form.js";

const FormComponent = ({ fields, submits }) => {
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.form.inputValues);
  const formErrors = useSelector((state) => state.form.formErrors);

  useEffect(() => {
    dispatch(clearForm());
  }, [])

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <Form className="w-25">
        {fields.map((field) => {
          const hasFieldError = R.has(field.id, formErrors);
          return (
            <Form.Group key={field.id} className="mb-3 invalid">
              <Form.Label htmlFor={field.id}>{field.label}</Form.Label>
              <Form.Control
                id={field.id}
                required
                type={field.type || "text"}
                placeholder={field.placeholder}
                onChange={(e) => {
                  dispatch(setInput({ [field.id]: e.target.value }));
                }}
                value={formValues[field.id] || ""}
              />
              {hasFieldError && (
                <Form.Text className="text-danger">
                  {formErrors[field.id]}
                </Form.Text>
              )}
            </Form.Group>
          );
        })}
      </Form>
      <div>
        {submits.map((submit) => (
          <Button
            key={submit.label}
            className="m-3"
            variant={submit.variant}
            onClick={() => submit.onClick({ formValues, dispatch })}
          >
            {submit.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FormComponent;
