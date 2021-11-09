const express = require("express"),
  path = require("path"),
  publicPath = path.join(__dirname, "..", "public"),
  app = express(),
  productsRoute = "/products",
  cartsRoute = "/carts",
  contactsRoute = "/contacts",
  PORT = 8080,
  {
    getAllProducts,
    getAllContacts,
    getCartById,
    insertNewProduct,
    insertNewContact,
    insertNewCart,
    addToCart,
    updateProductById,
    deleteProductById,
    printToWindowByCategory,
  } = require("./functions");

app.use(express.json());

app.use(express.static(publicPath));

app.get(`${productsRoute}/kitchen`, (req, res) => {
  printToWindowByCategory(req, res, "kitchen");
});

app.get(`${productsRoute}/bedroom`, (req, res) => {
  printToWindowByCategory(req, res, "bedroom");
});

app.get(`${productsRoute}/bath`, (req, res) => {
  printToWindowByCategory(req, res, "bath");
});

app.get(`${productsRoute}/livingRoom`, (req, res) => {
  printToWindowByCategory(req, res, "livingRoom");
});

app.get(productsRoute, (req, res) => {
  getAllProducts(req, res);
});

app.get(contactsRoute, (req, res) => {
  getAllContacts(req, res);
});

app.get(`${cartsRoute}/:id`, (req, res) => {
  getCartById(req, res);
});

app.post(productsRoute, (req, res) => {
  const name = req.body.name,
    price = req.body.price,
    description = req.body.description,
    category = req.body.category,
    image1 = req.body.image1,
    image2 = req.body.image2,
    productObj = {
      name: name,
      price: price,
      description: description,
      category: category,
      images: [image1, image2],
    };
  insertNewProduct(req, res, productObj);
});

app.post(contactsRoute, (req, res) => {
  const name = req.body.name,
    email = req.body.email,
    message = req.body.message,
    contactObj = { name, email, message };
  insertNewContact(req, res, contactObj);
});

app.post(cartsRoute, (req, res) => {
  const name = req.body.name,
    cartObj = { name: name };
  insertNewCart(req, res, cartObj);
});

app.patch(`${cartsRoute}/api/addToCart`, (req, res) => {
  addToCart(req, res);
});
app.patch(`${cartsRoute}/api/deleteFromCart`, (req, res) => {
  deleteFromCart(req, res);
});

app.patch(`${productsRoute}/:id`, (req, res) => {
  updateProductById(req, res);
});

app.delete(`${productsRoute}/:id`, (req, res) => {
  const id = req.params.id;
  deleteProductById(req, res, id);
});

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT} http://localhost:8080/`);
});
