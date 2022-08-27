import { EVENTS_FORM_MODULE_ID } from "../../constants/moduleIds.js";
import { FORM_MODULE } from "../../constants/moduleTypes.js";
import { clearForm } from "../../store/Form.js";
import { updateTableData } from "../../store/Table.js";
import apiRequest from "../../util/apiRequest.js";
import formSchema from "../formSchemas/eventsForm.js";
import validateFormSchema from "../../util/validateFormSchema.js";

export default {
  [EVENTS_FORM_MODULE_ID]: {
    moduleType: FORM_MODULE,
    fields: [
      {
        id: "first_name",
        label: "First name",
        placeholder: "First name",
      },
      {
        id: "last_name",
        label: "Last name",
        placeholder: "Last name",
      },
      {
        id: "email",
        label: "Email",
        placeholder: "Email",
        type: "email",
        errorMessages: {
          pattern: "Provaid a valid email.",
        },
        
      },
      {
        id: "event_date",
        label: "Event date",
        placeholder: "Event date",
        type: "date",
      },
    ],
    submits: [
      {
        label: "Add event",
        onClick: async ({ formValues, dispatch }) => {
          const valid = validateFormSchema(formSchema, formValues, dispatch);
          if (valid) {
            const newEvent = await apiRequest({
              url: "http://localhost:5000/events",
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formValues),
            });
            await dispatch(updateTableData([newEvent]));
            dispatch(clearForm());
          }
        },
      },
      {
        label: "Reset Form",
        variant: "warning",
        onClick: ({ dispatch }) => {
          dispatch(clearForm());
        },
      },
    ],
  },
};
