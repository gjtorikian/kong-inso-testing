const express = require("express");

const app = express();

app.use(express.json());

const fakeDB = [
  {
    id: 1,
    name: "Item 1",
    description: "This is item 1",
  },
  {
    id: 2,
    name: "Item 2",
    description: "This is item 2",
  },
  {
    id: 3,
    name: "Item 3",
    description: "This is item 3",
  },
];

app.get("/", function (req, res) {
  res.send(fakeDB);
});

app.post("/", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  let body = req.body;

  // FIXME: check that these are valid!
  let name = body.name;
  let description = body.description;
  let id = fakeDB.length + 1;
  fakeDB.push({ id, name, description });

  res.status(200).send({ id });
});

app.delete("/:id", function (req, res) {
  // FIXME: check that this is valid!
  let id = Number(req.params.id);

  const requiredIndex = fakeDB.findIndex((el) => {
    return el.id === id;
  });
  if (requiredIndex === -1) {
    return res.send(404, { error: "Item not found" });
  }
  let removedItem = fakeDB.splice(requiredIndex, 1);

  res.send(200, removedItem);
});

module.exports = app;
