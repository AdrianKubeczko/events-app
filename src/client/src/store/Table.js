import { createSlice } from "@reduxjs/toolkit";

export const Table = createSlice({
  name: "table",
  initialState: { tableData: [] },
  reducers: {
    clearTableData: (state) => {
      state.inputValues = [];
    },
    setTableData: (state, action) => {
      state.tableData = [...action.payload];
    },
    updateTableData: (state, action) => {
      state.tableData = [...state.tableData, ...action.payload];
    },
    deleteTableRow: (state, action) => {
        state.tableData = [...state.tableData.filter(record => record.id !== action.payload)];
      },
  },
});

export const { setTableData, clearTableData, updateTableData, deleteTableRow } = Table.actions;

export default Table.reducer;
