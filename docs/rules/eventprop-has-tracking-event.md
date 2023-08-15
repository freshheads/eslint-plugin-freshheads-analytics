# eventprop-has-tracking-event

Enforce that all interactive event props have a tracking event

## Rule Details

Examples of **incorrect** code for this rule:

```TSX
import React, { FC } from 'react';
import { Button } from '@chakra-ui/react';

export const PageBanner: FC = () => {
    return (
        <Button onClick={() => {console.log('test')}>
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

```TSX
import React, { FC } from 'react';
import { Button } from '@chakra-ui/react';

export const PageBanner: FC = () => {
    return (
        <Button onClick={() => {trackEvents.handleButtonClick('test')}}>
            text
        </Button>
    );
}
```

### Options

```js
{
    trackingFunctionNames: [ 'pushTrackingEvent', 'pushDataLayer', 'trackEvents' ], // possible names for tracking functions
    eventsToTrack: [
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
    ], // Interactive event props we want to check for
}
```

## When Not To Use It

This rule should not be used if you don't want to enforce tracking events for every event prop. For example if you want to use a different tracking implementation.
