# element-has-required-eventprop

Enforce that interactive elements without its own tracking implementation have atleast one event prop

## Rule Details

This rule aims to enforce that interactive elements have atleast one event prop. This is to ensure that all interactive elements have a way to be tracked.

Examples of **incorrect** code for this rule:

```TSX
import React, { FC } from 'react';
import { Button } from '@chakra-ui/react';

export const PageBanner: FC = () => {
    return (
        <Button>
            text
        </Button>
    );
}
```

Examples of **correct** code for this rule:

```TSX
import React, { FC } from 'react';
import { Button } from '@chakra-ui/react';

export const PageBanner: FC = () => {
    return (
        <Button onClick={() => {pushTrackingEvent({
            type: EventTypes.CLICK,
            name: 'page_banner_button_click'
            })}}>
            text
        </Button>
    );
}
```

### Options

```js
{
    elementsToCheck: [
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
    ], // Elements to check for required props
    eventProps: [
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
    ], // Alternative tracking method props that should be checked. If any of these are present on the element, the required props are not required anymore.
}
```

## When Not To Use It

This rule should not be used if you don't want to enforce that interactive elements have atleast one event prop. For example if you want to use a different tracking implementation.
