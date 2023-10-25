const componentExists = require("../componentExists.js");

module.exports = {
  description: "create container (pages, dummy)",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select the type of container",
      default: "pages",
      choices: () => ["pages", "dummy"],
    },
    {
      type: "input",
      name: "name",
      message: "What is the container name?",
      default: "Home",
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A container with this name already exists"
            : true;
        }
        return "The name is required";
      },
    },
  ],
  actions: (data) => {
    const componentTemplate = "./container/add/function.hbs";
    let targetRoot = data.type;
    if (data.type === "dummy") targetRoot = "pages/Dummy";

    const path = `../src/container/${targetRoot}/{{properCase name}}/index.jsx`;
    const readmePath = `../src/container/${targetRoot}/{{properCase name}}/readme.md`;

    const actions = [
      {
        type: "add",
        path,
        templateFile: componentTemplate,
      },
      {
        type: "add",
        path: readmePath,
        templateFile: "./container/add/readme.hbs",
      },

      {
        type: "modify",
        path: `../src/container/${targetRoot}/index.jsx`,
        pattern: /export {/g,
        templateFile: "./container/modify/import.hbs",
      },
      {
        type: "modify",
        path: `../src/container/${targetRoot}/index.jsx`,
        pattern: /};/g,
        templateFile: "./container/modify/export.hbs",
      },
      {
        type: "modify",
        path: `../src/container/${targetRoot}/index.jsx`,
        pattern: /\/\* don't.remove.init.index \*\//g,
        templateFile: "./container/modify/init.hbs",
      },
    ];

    actions.push({
      type: "lint:fix",
    });

    return actions;
  },
};
