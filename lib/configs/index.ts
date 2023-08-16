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

export const trackingFunctionNames = [
    'pushTrackingEvent',
    'pushDataLayer',
    'trackEvents',
];

const allConfigs = {
    recommended: {
        plugins: ['@freshheads/freshheads-analytics'],
        rules: {
            '@freshheads/freshheads-analytics/element-has-required-eventprop': [
                'error',
                {
                    elementsToCheck: interactiveElements,
                    eventProps: trackableEvents,
                },
            ],
            '@freshheads/freshheads-analytics/eventprop-has-tracking-event': [
                'error',
                {
                    eventsToTrack: trackableEvents,
                    trackingFunctionNames: trackingFunctionNames,
                },
            ],
        },
    },
};

export default allConfigs;
