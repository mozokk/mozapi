module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
	  "plugin:@typescript-eslint/recommended",
	  "prettier/@typescript-eslint",
	  "plugin:prettier/recommended"
	],
	rules: {
		"@typescript-eslint/explicit-function-return-type": "off"
	},
	parserOptions: {
	  ecmaVersion: 2020,
	  sourceType: "module"
	}
}
