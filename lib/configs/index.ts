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

export const trackingProps = ['data-track-name', 'data-track-location'];

const allConfigs = {
    recommended: {
        plugins: ['freshheads-analytics-test'],
        rules: {
            'freshheads-analytics-test/element-has-required-tracking-props': [
                'error',
                {
                    trackingProps: trackingProps,
                    elementsToCheck: interactiveElements,
                    alternativeTrackingMethodProps: trackableEvents,
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
