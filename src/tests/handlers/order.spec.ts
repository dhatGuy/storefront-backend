import request from "supertest";
import app from "../../app";
import { query } from "../../database";
import UserStore, { User } from "../../models/User";
import { resetTables } from "../../utils/resetTables";

let authedUser: User;
let token: string;

describe("/orders route", () => {
  beforeAll(async () => {
    await resetTables();
    const store = new UserStore();

    const user = {
      firstName: "John",
      lastName: "Doe",
      username: "john",
      password: "password",
    };

    authedUser = await store.create(user);

    const res = await request(app).post("/users/authenticate").send({
      username: "john",
      password: "password",
    });

    token = res.body.token;
  });

  beforeEach(async () => {
    await query(
      `INSERT INTO orders (id, user_id, status) VALUES (1, $1, 'active')`,
      [authedUser.id]
    );
  });

  afterEach(async () => {
    await query("DELETE FROM orders");
  });

  it("GET /", async () => {
    const result = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toEqual(200);
    expect(result.body.length).toEqual(1);
  });

  it("GET /:id", async () => {
    const result = await request(app)
      .get("/orders/1")
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toEqual(200);
    expect(result.body.user_id).toEqual(authedUser.id);
  });

  it("POST /", async () => {
    await query("DELETE FROM orders");

    const result = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        user_id: authedUser.id,
        status: "active",
      });

    expect(result.status).toEqual(200);
    expect(result.body.user_id).toEqual(authedUser.id);
  });

  it("PUT /:id", async () => {
    const result = await request(app)
      .put("/orders/1")
      .set("Authorization", `Bearer ${token}`)
      .send({
        status: "complete",
      });

    expect(result.status).toEqual(200);
    expect(result.body.status).toEqual("complete");
  });

  it("DELETE /:id", async () => {
    const result = await request(app)
      .delete("/orders/1")
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toEqual(204);
  });

  it("POST /:id/products", async () => {
    await query(
      `INSERT INTO products (id, name, price, category) VALUES (1, 'Mango', 257.99, 'fruits')`
    );

    const result = await request(app)
      .post("/orders/1/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: 1,
        quantity: 2,
      });

    expect(result.status).toEqual(200);
    expect(result.body.quantity).toEqual(2);
  });
});

afterAll(async () => {
  // await resetTables();
});
