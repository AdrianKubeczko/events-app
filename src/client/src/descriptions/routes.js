import { HOMEPAGE_ROUTE } from "../constants/routes.js";
import {
  EVENTS_FORM_MODULE_ID,
  EVENTS_TABLE_MODULE_ID,
} from "../constants/moduleIds.js";

export default [
  {
    path: HOMEPAGE_ROUTE,
    modules: [EVENTS_FORM_MODULE_ID, EVENTS_TABLE_MODULE_ID],
  },
];
