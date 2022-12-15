import { query } from "../../database";
import { OrderStore } from "../../models/Order";
import UserStore from "../../models/User";
import { resetTables } from "../../utils/resetTables";

const store = new OrderStore();
const userStore = new UserStore();

const user = {
  firstName: "John",
  lastName: "Doe",
  username: "john",
  password: "password",
};

let userId: number;

describe("Order Model", () => {
  beforeAll(async () => {
    await resetTables();

    const authUser = await userStore.create(user);
    userId = authUser.id as number;
  });

  beforeEach(async () => {
    await query(
      `INSERT INTO orders (id, user_id, status) VALUES (1, $1, 'active')`,
      [userId]
    );
  });

  afterEach(async () => {
    await query("DELETE FROM orders");
  });

  it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        status: "active",
      },
    ]);
  });

  it("show method should return the correct order", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: "active",
    });
  });

  it("create method should add a order", async () => {
    await query("DELETE FROM orders");

    const result = await store.create({
      user_id: 1,
      status: "active",
    });
    expect(result.user_id).toEqual(1);
    expect(result.status).toEqual("active");
  });

  it("delete method should remove the order", async () => {
    await store.delete(1);
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it("update method should update the order status", async () => {
    await store.update(1, "complete");

    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: "complete",
    });
  });

  it("addProduct method should add a product to the order", async () => {
    await query(
      `INSERT INTO products (id, name, price, category) VALUES (1, 'test', 1, 'test')`
    );
    await store.addProduct(1, 1, 1);

    const result = await query(
      `SELECT * FROM orders_products WHERE order_id = 1 AND product_id = 1`
    );
    expect(result.rows[0]).toEqual({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 1,
    });
  });

  // afterAll(async () => {
  //   await query("DELETE FROM users");
  //   await query(`ALTER SEQUENCE "users_id_seq" RESTART WITH 1`);
  // });
});
