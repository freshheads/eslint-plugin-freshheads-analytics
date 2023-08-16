# eslint-plugin-freshheads-analytics

make sure we track all user events

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-freshheads-analytics`:

```sh
npm install eslint-plugin-freshheads-analytics --save-dev
```

## Usage

### Default usage

add `plugin:freshheads-analytics/recommended` to te extends section of your `.eslintrc` configuration file.

```json
{
    "extends": ["plugin:@freshheads/freshheads-analytics/recommended"]
}
```

### custom usage

Add `freshheads-analytics` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["@freshheads/freshheads-analytics"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "freshheads-analytics/element-has-required-eventprop": [
            "error",
            {
                "elementsToCheck": [
                    "a",
                    "button",
                    "input",
                    "select",
                    "textarea",
                    "Button",
                    "Link",
                    "ChakraLink",
                    "NextLink",
                    "IconButton"
                ],
                "alternativeTrackingMethodProps": [
                    "onClick",
                    "onMouseDown",
                    "onMouseUp",
                    "onSubmit",
                    "onDblClick",
                    "onDoubleClick",
                    "onDrag",
                    "onPause",
                    "onPlay",
                    "onKeyDown",
                    "onKeyPress",
                    "onKeyUp"
                ]
            }
        ],
        "freshheads-analytics/eventprop-has-tracking-event": [
            "error",
            {
                "eventsToTrack": [
                    "onClick",
                    "onMouseDown",
                    "onMouseUp",
                    "onSubmit",
                    "onDblClick",
                    "onDoubleClick",
                    "onDrag",
                    "onPause",
                    "onPlay",
                    "onKeyDown",
                    "onKeyPress",
                    "onKeyUp"
                ],
                "trackingFunctionName": "pushTrackingEvent"
            }
        ]
    }
}
```
