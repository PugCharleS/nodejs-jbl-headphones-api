require("dotenv").config();
const mysql = require("mysql2/promise");

class ProductsManager {
  constructor() {
    this.db = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    });
  }

  async getProducts() {
    const [rows] = await this.db.query("SELECT * FROM products");
    return rows;
  }

  async getProduct(id) {
    const [rows] = await this.db.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  async createProduct(product) {
    const { nombre, color, precio, cantidad, imagen } = product;
    const [result] = await this.db.query(
      "INSERT INTO products (nombre, color, precio, cantidad, imagen) VALUES (?, ?, ?, ?, ?)",
      [nombre, color, precio, cantidad, imagen]
    );
    return result.insertId;
  }

  async updateProduct(id, product) {
    const { nombre, color, precio, cantidad, imagen } = product;
    const [result] = await this.db.query(
      "UPDATE products SET nombre = ?, color = ?, precio = ?, cantidad = ?, imagen = ? WHERE id = ?",
      [nombre, color, precio, cantidad, imagen, id]
    );
    return result.affectedRows > 0;
  }

  async deleteProduct(id) {
    const [result] = await this.db.query("DELETE FROM products WHERE id = ?", [
      id,
    ]);
    return result.affectedRows > 0;
  }
}

module.exports = ProductsManager;
