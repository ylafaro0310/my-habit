module.exports = {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript"
    ],
    "plugins": ["react", "@typescript-eslint", "prettier"],
    "env": {
      "node": true,
      "browser": true,
      "jest": true,
      "es6": true
    },
    "rules": {
      "sort-imports": ["error", { "ignoreDeclarationSort": true }],
      "import/order": ["error", { "newlines-between": "always" }],
      "react/jsx-sort-props": [ 2 ],
      "prettier/prettier": [
        "error",
        {
          "tabWidth": 2,
          "singleQuote": true,
          "semi": true,
          "printWidth": 80,
          "trailingComma": "all",
          "jsxSingleQuote": true
        }
      ]
    },
    "parser": "@typescript-eslint/parser",
    "settings": {
      "react": {
        "version": "detect"
      },
      "react/prop-types": ["error", { "skipUndeclared": true }],
      "import/ignore": ["node_modules"],
      "import/resolver": {
        "node": { "moduleDirectory": ["node_modules", "src"] }
      }
    }
  }
  