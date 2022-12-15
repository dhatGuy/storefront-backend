import { query } from "../database";

type Order = {
  id?: number;
  user_id: number;
  status: "active" | "complete";
};

export class OrderStore {
  index = async (): Promise<Order[]> => {
    try {
      const result = await query(`SELECT * FROM orders`);
      return result.rows;
    } catch (error) {
      throw new Error(`Unable to fetch orders: ${error}`);
    }
  };

  show = async (id: number): Promise<Order> => {
    try {
      const result = await query(`SELECT * FROM orders WHERE id=($1)`, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to fetch order: ${error}`);
    }
  };

  create = async (order: Order): Promise<Order> => {
    try {
      const sql = `INSERT INTO orders (user_id, status) 
        VALUES ($1, $2) RETURNING *`;
      const result = await query(sql, [order.user_id, order.status]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to create order: ${error}`);
    }
  };

  delete = async (id: number): Promise<Order> => {
    try {
      const sql = `DELETE FROM orders WHERE id=($1) RETURNING *`;
      const result = await query(sql, [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to delete order: ${error}`);
    }
  };

  update = async (id: number, status: Order["status"]): Promise<Order> => {
    try {
      const sql = `UPDATE orders SET status=($1) WHERE id=($2) RETURNING *`;
      const result = await query(sql, [status, id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to update order: ${error}`);
    }
  };

  addProduct = async (
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<Order> => {
    try {
      const sql = `INSERT INTO orders_products (order_id, product_id, quantity) 
        VALUES ($1, $2, $3) RETURNING *`;
      const result = await query(sql, [orderId, productId, quantity]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Unable to add product to order: ${error}`);
    }
  };
}
