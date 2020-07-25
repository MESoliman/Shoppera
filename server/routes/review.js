const router = require("express").Router();
const Review = require("../models/review");
const verifyToken = require("../middlewares/verify-token");
const Product = require("../models/product");

router.post("/reviews/:productID", verifyToken, async (req, res) => {
  try {
    const review = new Review();

    console.log(req.body);

    review.headline = req.body.headline;
    review.body = req.body.body;
    review.rating = req.body.rating;
    review.photo = req.body.photo;
    review.user = req.decoded._id;
    review.productID = req.params.productID;

    await Product.update({ $push: { reviews: review._id } });

    const savedReview = await review.save();

    if (savedReview) {
      res.json({ success: true, messaege: "Successfully Added Review" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/reviews/:productID", async (req, res) => {
  try {
    const productReviews = await Review.find({
      productID: req.params.productID,
    })
      .populate("user")
      .exec();

    res.json({ success: true, reviews: productReviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("reviews", (req, res) => {
  console.log(req.body);

  res.json({ success: true, message: "Working" });
});

module.exports = router;
