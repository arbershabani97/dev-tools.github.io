export const eslintConfig = `
{
    "extends": [
        "react-app",
        "airbnb",
        "alloy",
        "plugin:jsx-a11y/recommended",
        "eslint:recommended",
        "eslint:all",
        "plugin:react/all",
        "plugin:react/recommended",
        "plugin:react-redux/recommended",
        "prettier",
        "prettier/react",
        "plugin:prettier/recommended",
        "canonical/lodash",
        "problems"
    ],
    "plugins": ["react", "jsx-a11y", "react-redux", "react-extra", "react-hooks", "prettier", "autofix", "filenames"],
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    "rules": {
        "func-style": [2, "declaration", {"allowArrowFunctions": true}],
        "react/function-component-definition": 0,
        "no-shadow": 0,
        "no-param-reassign": 0,
        "array-func/prefer-array-from": 0,
        "react/require-optimization": 0,
        "no-underscore-dangle": 0,
        "no-plusplus": 0,
        "no-warning-comments": 0,
        "max-lines-per-function": 0,
        "no-promise-executor-return":0,
        "no-unreachable-loop":0,
        "react/jsx-max-depth": [
            2,
            {
                "max": 8
            }
        ],
        "no-invalid-this": 0,
        "react-extra/no-inline-styles": 2,
        "sort-vars": 0,
        "sort-keys": 0,
        "sort-imports": 0,
        "no-process-env": 0,
        "react/jsx-no-literals": 0,
        "react/jsx-uses-react": 2,
        "react/jsx-uses-vars": 2,
        "id-length": 0,
        "react/no-set-state": 0,
        "no-ternary": 0,
        "react/jsx-no-bind": 1,
        "no-else-return": 2,
        "react/no-deprecated": 2,
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [".js", ".jsx"]
            }
        ],
        "prettier/prettier": [
            2,
            {
                "printWidth": 250,
                "tabWidth": 4,
                "useTabs": true,
                "bracketSpacing": false,
                "trailingComma": "all",
                "semi": true
            }
        ],
        "react-redux/connect-prefer-named-arguments": 2,
        "react/prop-types": 0,
        "max-len": [
            2,
            {
                "code": 250
            }
        ],
        "brace-style": [2, "1tbs"],
        "indent": [2, "tab", {"SwitchCase": 1,"ignoredNodes": ["TemplateLiteral"]}],
        "semi": [2, "always"],
        "object-curly-spacing": [2, "never"],
        "react/jsx-boolean-value": 2,
        "react/jsx-props-no-spreading": 0,
        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 0,
        "react-redux/prefer-separate-component-file": 0,
        "camelcase": 2,
        "react/state-in-constructor": 0,
        "react/no-multi-comp": [2, {"ignoreStateless": true}],
        "no-useless-constructor": 2,
        "comma-style": [2, "last"],
        "one-var": [
            2,
            {
                "let": "always",
                "var": "always",
                "const": "never"
            }
        ],
        "lodash/prefer-lodash-typecheck": 0,
        "jsx-a11y/label-has-associated-control": 0,
        "prefer-named-capture-group": 0,
        "require-unicode-regexp": 0,
        "import/extensions": 0,
        "optimize-regex/optimize-regex": 0,
        "promise/no-promise-in-callback": 0,
        "promise/no-return-wrap": 0,
        "promise/catch-or-return": 0,
        "promise/always-return": 0,
        "lodash/prefer-get": 0,
        "default-param-last": 0,
        "init-declarations":0,
        "no-magic-numbers":0,
        "lodash/prefer-immutable-method":0,
        "no-case-declarations":0,
        "no-prototype-builtins":0,
        "no-loss-of-precision":0,
        "no-useless-backreference": 0,
        "default-case-last": 0,
        "eslint-comments/no-unlimited-disable":0,
        "import/prefer-default-export":0
    }
}
`;
