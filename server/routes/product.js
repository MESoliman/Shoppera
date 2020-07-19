const router = require("express").Router();
const Product = require("../models/product");

//Post Create new product

router.post("/products", async (req, res) => {
  try {
    let product = new Product();

    //category: req.body.category,
    //owner: req.body.owner,
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.body.photo;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;
    //rating: req.body.rating;

    await product.save();

    res.json({ status: true, message: "Successfully Saved" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

//Get get all products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();

    res.json({ success: true, products: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//Get get a single product
router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });

    res.json({ success: true, product: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//Put update a product
router.put("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          photo: req.body.photo,
          description: req.body.description,
          owner: req.body.ownerID,
          stockQuantity: req.body.stockQuantity,
        },
      },
      { upsert: true }
    );

    res.json({ success: true, updatedProduct: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//Delete delete a product
router.delete("/products/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if (deletedProduct) {
      res.json({ success: true, message: "Successfully deleted" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
