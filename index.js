const express = require("express");
const fs = require("node:fs");
const app = express();
const port = 8080;

const getCurrentSeason = () => {
  const month = new Date().getMonth() + 1;
  if ([12, 1, 2].includes(month)) return "iarna";
  if ([3, 4, 5].includes(month)) return "primavara";
  if ([6, 7, 8].includes(month)) return "vara";
  if ([9, 10, 11].includes(month)) return "toamna";
};

// Set EJS as the view engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Define routes
app.get("/getPosts", (req, res) => {
  res.send("post 1, post 2, post 3");
});

function renderHomepage(res) {
  const imagesData = JSON.parse(
    fs.readFileSync(__dirname + "/public/data/images.json", "utf8")
  );

  const currentSeason = getCurrentSeason();
  const filteredImages = imagesData.imagini
    .filter((img) => img.anotimp === currentSeason)
    .slice(0, 10);
  res.render("pagini/homepage", { images: filteredImages });
}

app.get("/", (req, res) => {
  renderHomepage(res);
});

app.get("/home", (req, res) => {
  renderHomepage(res);
});

app.get("/index", (req, res) => {
  renderHomepage(res);
});

app.get("/aboutus", (req, res) => {
  res.render("pagini/aboutus");
});

app.get("/hrana-caini", (req, res) => {
  res.render("pagini/hrana-caini");
});

app.get("/recomandari", (req, res) => {
  res.render("pagini/recomandari");
});

app.get("/galerie", (req, res) => {
  const imagesData = JSON.parse(
    fs.readFileSync(__dirname + "/public/data/images.json", "utf8")
  );
  const currentSeason = getCurrentSeason();
  const filteredImages = imagesData.imagini
    .filter((img) => img.anotimp === currentSeason)
    .slice(0, 10);
  res.render("pagini/galerie", { images: filteredImages });
});

app.get("/*", (req, res) => {
  res.render("pagini/not-found");
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(__dirname);
  console.log(__filename);
  console.log(process.cwd());
});
