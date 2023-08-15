# eslint-plugin-freshheads-analytics-test

make sure we track all user events

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-freshheads-analytics-test`:

```sh
npm install eslint-plugin-freshheads-analytics-test --save-dev
```

## Usage

Add `freshheads-analytics-test` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "freshheads-analytics-test"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "freshheads-analytics-test/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


