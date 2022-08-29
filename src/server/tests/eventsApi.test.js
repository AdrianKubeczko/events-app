import request from "supertest";
import events from "../api/events/index.js";
import createApp from "../app.js";
import {
  getEvents,
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} from "./mocks/eventsDbActions.js";

const app = createApp([
  events({ getEvents, addEvent, getEvent, updateEvent, deleteEvent }),
]);

describe("events", () => {
  const validRes = {
    rows: [
      {
        id: 1,
        first_name: "mockName",
        last_name: "mockName",
        email: "mock@email.com",
        event_date: "2022-0101",
      },
    ],
  };
  const invalidRes = {
    rows: [
      {
        first_name: "mockName",
        last_name: "mockName",
        email: "mockemail.com",
        event_date: "2022-0101",
      },
    ],
  };
  const validReq = {
    first_name: "mockName",
    last_name: "mockName",
    email: "mock@email.com",
    event_date: "2022-0101",
  };
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // get
  test("get all events returns proper data", async () => {
    getEvents.mockResolvedValue(validRes);
    const res = await request(app).get("/events");
    expect(res.statusCode).toEqual(200);
  });
  test("get all events returns wrong data", async () => {
    getEvents.mockResolvedValue(invalidRes);
    const res = await request(app).get("/events");
    expect(res.statusCode).toEqual(500);
  });

  // post
  test("post an event successfully", async () => {
    addEvent.mockResolvedValue(validRes);
    const res = await request(app).post("/events").send(validReq);
    expect(res.statusCode).toEqual(200);
  });
  test("send wrong data to post request", async () => {
    const res = await request(app).post("/events").send({});
    expect(res.statusCode).toEqual(400);
  });
  test("post returns wrong data", async () => {
    addEvent.mockResolvedValue(invalidRes);
    const res = await request(app).post("/events").send(validReq);
    expect(res.statusCode).toEqual(500);
  });

  // get one
  test("get a specific event", async () => {
    getEvent.mockResolvedValue(validRes);
    const res = await request(app).get("/events/1").send({
      id: 1,
    });
    expect(res.statusCode).toEqual(200);
  });
  test("get a specific event returns wrong data", async () => {
    getEvent.mockResolvedValue(invalidRes);
    const res = await request(app).get("/events/1").send({
      id: 1,
    });
    expect(res.statusCode).toEqual(500);
  });

  // put
  test("update an event successfully", async () => {
    updateEvent.mockResolvedValue(validRes);
    const res = await request(app).put("/events/1").send(validReq);
    expect(res.statusCode).toEqual(200);
  });
  test("send wrong data to put request", async () => {
    const res = await request(app).put("/events/1").send({});
    expect(res.statusCode).toEqual(400);
  });
  test("put returns wrong data", async () => {
    updateEvent.mockResolvedValue(invalidRes);
    const res = await request(app).put("/events/1").send(validReq);
    expect(res.statusCode).toEqual(500);
  });

  // delete
  test("deletes a specific event", async () => {
    deleteEvent.mockResolvedValue(validRes);
    const res = await request(app).delete("/events/1").send({
      id: 1,
    });
    expect(res.statusCode).toEqual(200);
  });
  test("delete a specific event returns wrong data", async () => {
    deleteEvent.mockResolvedValue(invalidRes);
    const res = await request(app).delete("/events/1").send({
      id: 1,
    });
    expect(res.statusCode).toEqual(500);
  });
});
