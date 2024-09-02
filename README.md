# H2O 4S App

## Set up

cd to the root directory, and then run the following scripts

```bash
bash ./build-scripts/init-dependencies.sh
```

## Create a new app module

```bash
npx create-react-native-library@0.38.1 cpn-rn-4s-appmodule-{MODULE_NAME}
```

The command will asks several questions. Answer like below:

- Name: cpn-rn-4s-appmodule-{MODULE_NAME}
- Description: cpn-rn-4s-appmodule
- DocumentationURL for package author: https://www.compathnion.com
- URL for repository: https://gitpub.compathnion.com/cpn-rn/4s-appmodule
- Type of library: Native view
- Language: Kotlin & Swift
- Example app: Test app

After the command finishes, rename the newly-created directory from
`cpn-rn-4s-appmodule-{MODULE_NAME}` to `appmodule-{MODULE_NAME}`. Then `cd`
into that directory. We need to perform some edits:

In **packages.json**:

- Section `devDependencies` Replace `"typescript"` line with the same line
  from the same sections in the main app's **packages.json**

- Section `eslintConfig -> rules -> prettier/prettier` and `prettier`: Update
  these objects to have the below:

```json
{
  "quoteProps": "consistent",
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false
}
```

- Section `scripts`: Find the item `"prepare"`, and change it to `"build-lib"`# unit-test
