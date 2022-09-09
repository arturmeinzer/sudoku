module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "google",
    ],
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 9,
    },
    rules: {
        quotes: ["error", "double"],
        indent: ["error", 4],
    },
};
