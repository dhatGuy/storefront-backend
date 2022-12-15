import { query } from "../database";

export class DashboardQueries {
  // Top 5 most popular products
  fivePopularProducts = async () => {
    try {
      const sql = `
        SELECT p.id, p.name, p.price, p.category, SUM(o.quantity) AS total_quantity
        FROM products p
        JOIN orders_products o ON p.id = o.product_id
        GROUP BY p.id
        ORDER BY total_quantity DESC
        LIMIT 5
        `;
      const result = await query(sql);
      return result.rows;
    } catch (error) {
      throw new Error(`Could not get products. Error: ${error}`);
    }
  };
}
