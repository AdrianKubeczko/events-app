export default {
  get: {
    type: "array",
    items: {
      type: "object",
      properties: {
        id: { type: "integer" },
        first_name: { type: "string" },
        last_name: { type: "string" },
        email: {
          type: "string",
          pattern:
            '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
        },
        event_date: { type: "string" },
      },
      required: ["id", "first_name", "last_name", "email", "event_date"],
      additionalProperties: false,
    },
  },
  common: {
    type: "object",
    properties: {
      id: { type: "integer" },
      first_name: { type: "string" },
      last_name: { type: "string" },
      email: {
        type: "string",
        pattern:
          '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
      },
      event_date: { type: "string" },
    },
    required: ["id", "first_name", "last_name", "email", "event_date"],
    additionalProperties: false,
  },
};
