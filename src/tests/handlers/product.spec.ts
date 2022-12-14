import { default as request, default as supertest } from "supertest";
import app from "../../app";
import { query } from "../../database";
import UserStore from "../../models/User";

let token: string;

describe("/products route", () => {
  beforeAll(async () => {
    const store = new UserStore();

    const user = {
      firstName: "John",
      lastName: "Doe",
      username: "john",
      password: "password",
    };

    await store.create(user);

    const res = await supertest(app).post("/users/authenticate").send({
      username: "john",
      password: "password",
    });

    token = res.body.token;
  });

  beforeEach(async () => {
    await query(
      `INSERT INTO products (id, name, price, category) VALUES (1, 'Mango', 257.99, 'fruits')`
    );
  });

  afterEach(async () => {
    await query("DELETE FROM products");
  });

  it("GET /", async () => {
    const result = await request(app).get("/products");
    expect(result.status).toEqual(200);
    expect(result.body.length).toEqual(1);
  });

  it("GET /:id", async () => {
    const result = await request(app).get("/products/1");
    expect(result.status).toEqual(200);
    expect(result.body.name).toEqual("Mango");
  });

  it("POST /", async () => {
    await query("DELETE FROM products");

    const result = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Apple",
        price: 100.99,
        category: "fruits",
      });

    expect(result.status).toEqual(201);
    expect(result.body.name).toEqual("Apple");
  });

  afterAll(async () => {
    await query("DELETE FROM users");
  });
});
