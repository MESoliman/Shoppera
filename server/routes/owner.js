const router = require("express").Router();
const Owner = require("../models/owner");

//Post request
router.post("/owners", async (req, res) => {
  try {
    const owner = new Owner();

    owner.name = req.body.name;
    owner.about = req.body.about;
    owner.photo = req.body.photo;

    await owner.save();

    res.json({ success: true, owner });
  } catch (err) {
    res.status(500).json({ success: true, message: err.message });
  }
});

//GET request

router.get("/owners", async (req, res) => {
  try {
    let owners = await Owner.find();

    res.json({ success: true, owners: owners });
  } catch (err) {
    res.status(500).json({ success: true, message: err.message });
  }
});

module.exports = router;
