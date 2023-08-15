import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../rules/eventprop-has-tracking-event';
import { trackableEvents, trackingFunctionNames } from '../../configs';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run('eventprop-has-tracking-event', rule, {
    valid: [
        {
            code: '<Button onClick={() => {pushTrackingEvent()}}>actie</Button>',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            options: [
                {
                    eventsToTrack: trackableEvents,
                    trackingFunctionNames: trackingFunctionNames,
                },
            ],
        },
        {
            code: '<Button onClick={() => {pushDataLayer()}}>actie</Button>',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            options: [
                {
                    eventsToTrack: trackableEvents,
                    trackingFunctionNames: trackingFunctionNames,
                },
            ],
        },
        {
            code: '<Button onClick={() => {trackEvents.trackingFunction()}}>actie</Button>',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            options: [
                {
                    eventsToTrack: trackableEvents,
                    trackingFunctionNames: trackingFunctionNames,
                },
            ],
        },
        {
            code:
                'const PageBanner = () => {\n' +
                'const test = () => {pushTrackingEvent()}\n' +
                'return ( \n' +
                "<Link href={'/'} onClick={test}>Terug</Link> \n" +
                ')\n' +
                '}',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            options: [
                {
                    eventsToTrack: trackableEvents,
                    trackingFunctionNames: trackingFunctionNames,
                },
            ],
        },
    ],

    invalid: [
        {
            code: '<Button onClick={test}>actie</Button>',
            errors: [
                {
                    messageId: 'functionDeclarationNotFound',
                    data: {
                        interactiveProp: 'onClick',
                        FunctionName: 'test',
                    },
                },
            ],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            options: [
                {
                    eventsToTrack: trackableEvents,
                    trackingFunctionNames: trackingFunctionNames,
                },
            ],
        },
        {
            code: "<Button onClick={() => {console.log('test')}}>actie</Button>",
            errors: [
                {
                    messageId: 'default',
                    data: {
                        interactiveProp: 'onClick',
                        trackingFunctionNames: trackingFunctionNames,
                    },
                },
            ],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            options: [
                {
                    eventsToTrack: trackableEvents,
                    trackingFunctionNames: trackingFunctionNames,
                },
            ],
        },
    ],
});
