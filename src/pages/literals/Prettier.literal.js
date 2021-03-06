export const prettierConfig = `{
    "printWidth": 300,
    "tabWidth": 4,
    "useTabs": true,
    "bracketSpacing": false,
    "trailingComma": "all",
    "semi": true
}`;

export const prettierGitHooksConfig = `{
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "**/*": "prettier --write --ignore-unknown"
    }
}`;
