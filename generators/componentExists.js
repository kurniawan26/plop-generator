/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require("fs");
const path = require("path");

const pageComponents = fs.readdirSync(
  path.join(__dirname, "../src/components")
);
const pageContainers = fs.readdirSync(path.join(__dirname, "../src/container"));
const pageStores = fs.readdirSync(path.join(__dirname, "../src/stores"));

const componentExists = (comp) => {
  const componentPaths = [
    ...pageComponents.map((c) => `../src/components/${c}`),
    ...pageContainers.map((c) => `../src/container/${c}`),
    ...pageStores.map((c) => `../src/stores/${c}`),
  ];
  return (
    componentPaths.includes(`../src/components/${comp}`)
    || componentPaths.includes(`../src/container/${comp}`)
    || componentPaths.includes(`../src/stores/${comp}`)
  );
};

module.exports = componentExists;
