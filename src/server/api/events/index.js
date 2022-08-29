import { GET, POST, PUT, DELETE } from "../../constants/requestMethods.js";
import validateSchema from "../../utils/validateSchema.js";
import payloadSchemas from "./payloadSchemas.js";
import responseSchamas from "./responseSchamas.js";

const handleError = (error, res) => {
  if (error.statusCode) {
    res.status(error.statusCode).json(error);
    return;
  }
  console.error(error);
};

export default (actionsDB) => ({
  tablePath: "/events",
  rowPath: "/events/:id",
  tableMethods: {
    [GET]: async (req, res) => {
      try {
        const events = await actionsDB.getEvents();
        validateSchema(responseSchamas.get, events.rows, "res");
        res.json(events.rows);
      } catch (error) {
        handleError(error, res);
      }
    },
    [POST]: async (req, res) => {
      try {
        const { first_name, last_name, email, event_date } = req.body;
        validateSchema(payloadSchemas.common, req.body, "req");
        const newEvent = await actionsDB.addEvent({
          first_name,
          last_name,
          email,
          event_date,
        });
        validateSchema(responseSchamas.common, newEvent.rows[0], "res");
        res.json(newEvent.rows[0]);
      } catch (error) {
        handleError(error, res);
      }
    },
  },
  rowMethods: {
    [GET]: async (req, res) => {
      try {
        const { id } = req.params;
        const event = await actionsDB.getEvent({ id });
        validateSchema(responseSchamas.get, event.rows, "res");
        res.json(event.rows);
      } catch (error) {
        handleError(error, res);
      }
    },
    [PUT]: async (req, res) => {
      try {
        const { id } = req.params;
        const { first_name, last_name, email, event_date } = req.body;
        validateSchema(payloadSchemas.common, req.body, "req");
        const updatedEvent = await actionsDB.updateEvent({
          first_name,
          last_name,
          email,
          event_date,
          id,
        });
        validateSchema(responseSchamas.common, updatedEvent.rows[0], "res");
        res.json(updatedEvent.rows[0]);
      } catch (error) {
        handleError(error, res);
      }
    },
    [DELETE]: async (req, res) => {
      try {
        const { id } = req.params;
        const deletedEvent = await actionsDB.deleteEvent({ id });
        validateSchema(responseSchamas.common, deletedEvent.rows[0], "res");
        res.json(deletedEvent.rows[0]);
      } catch (error) {
        handleError(error, res);
      }
    },
  },
});
