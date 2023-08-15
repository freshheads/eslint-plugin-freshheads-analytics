import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../rules/eventprop-has-tracking-event';
import { trackableEvents } from '../../configs';

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
                    trackingFunctionName: 'pushTrackingEvent',
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
                    trackingFunctionName: 'pushTrackingEvent',
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
                    trackingFunctionName: 'pushTrackingEvent',
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
                        trackingFunctionName: 'pushTrackingEvent',
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
                    trackingFunctionName: 'pushTrackingEvent',
                },
            ],
        },
    ],
});
