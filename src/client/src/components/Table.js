import pluck from "ramda/src/pluck";
import prop from "ramda/src/prop";
import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const TableComponent = ({ columns, tableActions, getDataFn }) => {
  const dispatch = useDispatch();
  const tableValues = useSelector((state) => state.table.tableData);

  useEffect(() => {
    getDataFn(dispatch);
  }, []);

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <Table bordered hover className="w-75 text-center">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id}>{column.label}</th>
            ))}
            {tableActions.map((action) => (
              <th key={action.id}>{action.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableValues.map((row) => {
            const columnIds = pluck("id", columns);
            return (
              <tr key={row.id}>
                {columnIds.map((id) => (
                  <td key={`${row.id}-${id}`}>{prop(id, row)}</td>
                ))}
                {tableActions.map((action) => {
                  const ActionRender = action.render;
                  return (
                    <td key={action.id}>
                      <Button
                        variant={action.buttonVariant}
                        onClick={() =>
                          action.actionFn({ dispatch, rowId: row.id })
                        }
                      >
                        {action.buttonText}
                      </Button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableComponent;
