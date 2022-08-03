const request = require("supertest");

const app = require("../app");

describe("GET /", function () {
  it("works", async function () {
    const response = await request(app)
      .get("/")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(3);
  });
});

describe("POST /", function () {
  it("works", async function () {
    const response = await request(app)
      .post("/")
      .set("Accept", "application/json")
      .send({
        name: "Another item",
        description: "Here is another item",
      });

    expect(response.status).toEqual(200);
  });
});

describe("DELETE /:id", function () {
  it("works", async function () {
    const response = await request(app)
      .delete("/3")
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body[0].id).toEqual(2);
  });
});
