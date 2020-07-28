const router = require("express").Router();
const algoliaSearch = require("algoliasearch");

const algoliaApiKey = require("../config/keys").ALGOLIA_API_KEY;
const algoliaAppId = require("../config/keys").ALGOLIA_APP_ID;
const algoliaIndex = require("../config/keys").ALGOLIA_INDEX;

const client = algoliaSearch(algoliaAppId, algoliaApiKey);

const index = client.initIndex(algoliaIndex);

router.post("/search", async (req, res) => {
  try {
    let result = await index.search(req.body.title);
    res.json(result.hits);
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;
