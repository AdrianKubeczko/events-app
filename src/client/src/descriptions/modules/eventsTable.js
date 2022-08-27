import { EVENTS_TABLE_MODULE_ID } from "../../constants/moduleIds.js";
import { TABLE_MODULE } from "../../constants/moduleTypes";
import { setTableData, deleteTableRow } from "../../store/Table.js";
import apiRequest from "../../util/apiRequest.js";

export default {
  [EVENTS_TABLE_MODULE_ID]: {
    moduleType: TABLE_MODULE,
    getDataFn: async (dispatch) => {
      const tableData = await apiRequest({
        url: "http://localhost:5000/events",
      });
      dispatch(setTableData(tableData));
    },
    columns: [
      {
        id: "id",
        label: "Event ID",
      },
      {
        id: "first_name",
        label: "First name",
      },
      {
        id: "last_name",
        label: "Last name",
      },
      {
        id: "email",
        label: "Email",
      },
      {
        id: "event_date",
        label: "Event date",
      },
    ],
    tableActions: [
      {
        id: "delete_event",
        label: "Delete event",
        buttonText: 'Delete',
        buttonVariant: 'danger',
        actionFn: async ({rowId, dispatch}) => {
          await apiRequest({
            url: `http://localhost:5000/events/${rowId}`,
            method: "DELETE",
          });
          dispatch(deleteTableRow(rowId))
        }
      },
    ],
  },
};
