require("dotenv").config({ path: "./src/.env" });
const DB = require("./db.config.js");
const express = require("express");
const cors = require("cors");
const uniqid = require("uniqid");
const urlModel = require("./url.model.js");
const { createUrlValidator, isRequestValidated } = require("./validator.js");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

DB;

app.get("/", (req, res) => {
  res.status(200).json({ status: 200, message: "API running well !!" });
});

app.post(
  "/url/create",
  createUrlValidator,
  isRequestValidated,
  async (req, res) => {
    const { url } = req.body;
    console.log(req.body);

    const urlObject = {
      slug: uniqid(),
      url,
    };

    const createdUrl = await urlModel.create(urlObject);

    res.status(201).json({
      status: 200,
      shortUrl: `http://localhost:5000/url/${createdUrl.slug}`,
      message: "url-created",
    });
  }
);

app.get("/url/:slug", async (req, res) => {
  const { slug } = req.params;

  const url = await urlModel.findOne({ slug });

  if (!url)
    return res.status(401).json({ status: 401, message: "Link may be broken" });

  res.redirect(url.url);
});

app.post("/getdata", async (req, res) => {
  const { slug } = req.body;

  const data = await urlModel.findOne({ slug });

  if (!data)
    return res
      .status(400)
      .json({ status: 400, message: "NO url exits with this slug" });

  res.status(200).json({ status: 200, data });
});

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
