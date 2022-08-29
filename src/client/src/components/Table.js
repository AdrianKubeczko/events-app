import React from "react";
import * as R from "ramda";
import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearTableData } from "../store/Table.js";

const TableComponent = ({ columns, tableActions, getDataFn }) => {
  const dispatch = useDispatch();
  const tableValues = useSelector((state) => state.table.tableData);

  useEffect(() => {
    dispatch(clearTableData());
    getDataFn(dispatch);
  }, [dispatch, getDataFn]);

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
            const columnIds = R.pluck("id", columns);
            return (
              <tr key={row.id}>
                {columnIds.map((id) => (
                  <td key={`${row.id}-${id}`}>{R.prop(id, row)}</td>
                ))}
                {tableActions.map((action) => {
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
