import * as R from "ramda";
import React from "react";
import {
  screen,
  fireEvent,
  within,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { EVENTS_TABLE_MODULE_ID } from "../../constants/moduleIds.js";
import moduleDescriptions from "../../descriptions/modules/index.js";
import { renderWithProviders } from "../util/storeSetUp.js";
import Table from "../../components/Table.js";
import { mapPromise } from "../../util/ramdaPlus.js";
import "@testing-library/jest-dom";

const getRowUtils = (rowData) => {
  const rowValues = R.values(rowData);
  const rowRegExp = new RegExp(R.join(" ", rowValues), "i");
  return {
    rowValues,
    rowRegExp,
  };
};

describe("eventsTable", () => {
  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => ({
      json: () => {
        return [];
      },
    }));
  });
  afterEach(() => cleanup);
  afterAll(() => {
    jest.restoreAllMocks();
  });
  const componentProps = R.prop(EVENTS_TABLE_MODULE_ID, moduleDescriptions);
  const columnLabels = R.pipe(
    R.prop("columns"),
    R.pluck("label")
  )(componentProps);
  const tableActionLabels = R.pipe(
    R.prop("tableActions"),
    R.pluck("label")
  )(componentProps);
  test("renders correct table columns", async () => {
    renderWithProviders(<Table {...componentProps} />);
    const columns = await mapPromise(
      async (label) =>
        await screen.findByRole("columnheader", {
          name: label,
        }),
      columnLabels
    );
    const actions = await mapPromise(
      async (label) =>
        await screen.findByRole("columnheader", {
          name: label,
        }),
      tableActionLabels
    );
    expect(columns.length).toEqual(5);
    expect(actions.length).toEqual(1);
  });
  test("renders row data", async () => {
    const rowData = {
      id: 1,
      first_name: "firstNameMock",
      last_name: "lastNameMock",
      email: "mock@email.com",
      event_date: "2022-01-01",
    };
    const { rowValues, rowRegExp } = getRowUtils(rowData);

    fetch.mockReturnValueOnce({
      json: () => {
        return [rowData];
      },
    });

    renderWithProviders(<Table {...componentProps} />);

    const cells = await mapPromise(
      async (value) =>
        await screen.findByRole("cell", {
          name: value,
        }),
      rowValues
    );
    const row = await screen.findByRole("row", {
      name: rowRegExp,
    });
    const deleteButton = within(row).getByRole("button", {
      name: "Delete",
    });

    expect(cells.length).toEqual(5);
    expect(deleteButton).toBeInTheDocument();
  });
  test("deletes apropriate row", async () => {
    const row1Data = {
      id: 1,
      first_name: "firstNameMock1",
      last_name: "lastNameMock1",
      email: "mock1@email.com",
      event_date: "2022-01-01",
    };
    const row2Data = {
      id: 2,
      first_name: "firstNameMock2",
      last_name: "lastNameMock2",
      email: "mock2@email.com",
      event_date: "2022-02-02",
    };
    const { rowValues: row1Values, rowRegExp: row1RegExp } =
      getRowUtils(row1Data);
    const { rowValues: row2Values } = getRowUtils(row2Data);

    fetch.mockReturnValueOnce({
      json: () => {
        return [row1Data, row2Data];
      },
    });

    renderWithProviders(<Table {...componentProps} />);

    const cells = await mapPromise(
      async (value) =>
        await screen.findByRole("cell", {
          name: value,
        }),
      [...row1Values, ...row2Values]
    );
    expect(cells.length).toEqual(10);

    const row1 = await screen.findByRole("row", {
      name: row1RegExp,
    });
    const deleteButton1 = within(row1).getByRole("button", {
      name: "Delete",
    });

    fireEvent.click(deleteButton1);

    await waitForElementToBeRemoved(row1);

    const row1Post = screen.queryByRole("row", {
      name: row1RegExp,
    });

    expect(row1Post).toBeNull();
  });
});
