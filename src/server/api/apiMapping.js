import events from "./events/index.js";
import eventsDB from "../DB/eventsDB/dbActions.js";

export default [events(eventsDB)];
