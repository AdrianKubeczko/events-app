import tableReducer, {
  setTableData,
  clearTableData,
  updateTableData,
  deleteTableRow,
} from "../../store/Table.js";

describe("tableReducer", () => {
  test("default value of tableData is empty", () => {
    expect(tableReducer(undefined, { type: undefined })).toEqual({
      tableData: [],
    });
  });
  test("setTableData updates tableData", () => {
    // updates empty tableData
    expect(
      tableReducer(
        undefined,
        setTableData([{ prop1: "value1", prop2: "value2" }])
      )
    ).toEqual({
      tableData: [{ prop1: "value1", prop2: "value2" }],
    });

    // overrides non-empty tableData
    expect(
      tableReducer(
        { tableData: [{ prop1: "value1", prop2: "value2" }] },
        setTableData([
          { prop3: "value3", prop4: "value4" },
          { prop5: "value5", prop6: "value6" },
        ])
      )
    ).toEqual({
      tableData: [
        { prop3: "value3", prop4: "value4" },
        { prop5: "value5", prop6: "value6" },
      ],
    });
  });
  test("clearTableData removes tableData", () => {
    expect(
      tableReducer(
        { tableData: [{ prop1: "value1", prop2: "value2" }] },
        clearTableData()
      )
    ).toEqual({
      tableData: [],
    });
  });
  test("clearTableData removes tableData", () => {
    // updates empty tableData
    expect(
      tableReducer(
        { tableData: [] },
        updateTableData([
          { prop3: "value3", prop4: "value4" },
          { prop5: "value5", prop6: "value6" },
        ])
      )
    ).toEqual({
      tableData: [
        { prop3: "value3", prop4: "value4" },
        { prop5: "value5", prop6: "value6" },
      ],
    });

    // updates non-empty tableData
    expect(
      tableReducer(
        { tableData: [{ prop1: "value1", prop2: "value2" }] },
        updateTableData([
          { prop3: "value3", prop4: "value4" },
          { prop5: "value5", prop6: "value6" },
        ])
      )
    ).toEqual({
      tableData: [
        { prop1: "value1", prop2: "value2" },
        { prop3: "value3", prop4: "value4" },
        { prop5: "value5", prop6: "value6" },
      ],
    });
  });
  test("deleteTableRow deletes appropriate row", () => {
    expect(
      tableReducer(
        {
          tableData: [
            { id: 1, prop1: "value1" },
            { id: 2, prop2: "value2" },
          ],
        },
        deleteTableRow(1)
      )
    ).toEqual({
      tableData: [{ id: 2, prop2: "value2" }],
    });
  });
});
