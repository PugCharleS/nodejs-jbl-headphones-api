// apiRouter.js
const express = require("express");
const ProductsManager = require("./ProductsManager");

const router = express.Router();
const manager = new ProductsManager();

router.get("/products", async (req, res) => {
  const products = await manager.getProducts();
  res.json(products);
});

router.get("/product/:id", async (req, res) => {
  const product = await manager.getProduct(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
});

router.post("/product", async (req, res) => {
  const id = await manager.createProduct(req.body);
  res.status(201).send({ id });
});

router.put("/product/:id", async (req, res) => {
  const updated = await manager.updateProduct(req.params.id, req.body);
  if (updated) {
    res.status(200).send("Product updated");
  } else {
    res.status(404).send("Product not found");
  }
});

router.delete("/product/:id", async (req, res) => {
  const deleted = await manager.deleteProduct(req.params.id);
  if (deleted) {
    res.status(200).send("Product deleted");
  } else {
    res.status(404).send("Product not found");
  }
});

module.exports = router;
