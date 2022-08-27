import has from "ramda/src/has";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setInput } from "../store/Form.js";

const FormComponent = ({ fields, submits }) => {
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.form.inputValues);
  const formErrors = useSelector((state) => state.form.formErrors);

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <Form className="w-25">
        {fields.map((field) => {
          const hasFieldError = has(field.id, formErrors);
          return (
            <Form.Group key={field.id} className="mb-3 invalid">
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
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