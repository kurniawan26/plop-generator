const path = require("path");
const componentExists = require("../componentExists.js");

module.exports = {
  description: "create store",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "What is the store name?",
      default: "Counter",
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A store with this name already exists"
            : true;
        }
        return "The name is required";
      },
    },
  ],

  actions: () => {
    const actions = [
      {
        type: "add",
        path: `../src/stores/{{camelCase name}}/action.js`,
        templateFile: `${path.resolve(__dirname)}/add/action.hbs`,
      },
      {
        type: "add",
        path: `../src/stores/{{camelCase name}}/reducer.js`,
        templateFile: `${path.resolve(__dirname)}/add/reducer.hbs`,
      },
      {
        type: "add",
        path: `../src/stores/{{camelCase name}}/readme.md`,
        templateFile: `${path.resolve(__dirname)}/add/readme.hbs`,
      },
      {
        type: "modify",
        path: `../src/stores/index.js`,
        pattern: /(const store = configureStore\(\{[\s\S]*?reducer: {)/g,
        templateFile: "./stores/modify/import.hbs",
      },
    ];

    actions.push({
      type: "lint:fix",
    });

    return actions;
  },
};
