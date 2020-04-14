import assert from "assert";

describe("landingpage-react-template", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "landingpage-react-template");
  });
});
