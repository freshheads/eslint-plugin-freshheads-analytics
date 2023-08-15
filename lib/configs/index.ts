export const interactiveElements = [
    'a',
    'button',
    'input',
    'select',
    'textarea',
    'Button',
    'Link',
    'ChakraLink',
    'NextLink',
    'IconButton',
];

export const trackableEvents = [
    'onClick',
    'onMouseDown',
    'onMouseUp',
    'onSubmit',
    'onDblClick',
    'onDoubleClick',
    'onDrag',
    'onPause',
    'onPlay',
    'onKeyDown',
    'onKeyPress',
    'onKeyUp',
];

const allConfigs = {
    recommended: {
        plugins: ['freshheads-analytics'],
        rules: {
            'freshheads-analytics/element-has-required-eventprop': [
                'error',
                {
                    elementsToCheck: interactiveElements,
                    eventProps: trackableEvents,
                },
            ],
            'freshheads-analytics-test/eventprop-has-tracking-event': [
                'error',
                {
                    eventsToTrack: trackableEvents,
                    trackingFunctionName: 'pushTrackingEvent',
                },
            ],
        },
    },
};

export default allConfigs;
