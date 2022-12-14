import request from "supertest";
import app from "../../app";
import { query } from "../../database";
import UserStore from "../../models/User";

const store = new UserStore();

const user = {
  firstName: "John",
  lastName: "Doe",
  username: "john",
  password: "password",
};

const user2 = {
  firstName: "Jane",
  lastName: "Doe",
  username: "jane",
  password: "password",
};

let token: string;

let id: number;

describe("/users route", () => {
  beforeAll(async () => {
    const authUser = await store.create(user);
    id = authUser.id as number;
  });

  afterAll(async () => {
    await query(`DELETE FROM users`);
  });

  it("POST /authenticate", async () => {
    const result = await request(app)
      .post("/users/authenticate")
      .send({ username: "john", password: "password" });

    expect(result.status).toEqual(200);
    expect(result.body.token).toBeDefined();

    token = result.body.token;
  });

  it("GET /", async () => {
    const result = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toEqual(200);
    expect(result.body.length).toEqual(1);
  });

  it("GET /:id", async () => {
    const result = await request(app)
      .get(`/users/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toEqual(200);
    expect(result.body.firstName).toEqual("John");
  });

  it("POST /", async () => {
    const result = await request(app).post("/users").send(user2);

    expect(result.status).toEqual(201);
    expect(result.body.firstName).toEqual("Jane");
  });
});
