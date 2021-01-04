module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "prettier/prettier": [
            "error",
            {
                "bracketSpacing": true,
                "jsxBracketSameLine": true,
                "jsxSingleQuote": true,
                "printWidth": 80,
                "semi": true,
                "singleQuote": true,
                "tabWidth": 2
            }
        ]
    }
};