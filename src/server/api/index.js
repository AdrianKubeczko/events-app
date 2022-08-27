import events from "./events.js";

const apis = [events];

export default (app) =>
  apis.map((api) => {
    const { tablePath, tableMethods, rowPath, rowMethods } = api;
    const tableMethodKeys = Object.keys(tableMethods);
    const rowMethodKeys = Object.keys(rowMethods);
    tableMethodKeys.map((key) => app[key](tablePath, tableMethods[key]));
    rowMethodKeys.map((key) => app[key](rowPath, rowMethods[key]));
  });
