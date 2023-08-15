import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../rules/element-has-required-eventprop';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
import * as mocha from 'mocha';
import { interactiveElements, trackableEvents } from '../../configs';

RuleTester.afterAll = mocha.after;
const ruleTester = new RuleTester();

ruleTester.run('element-has-required-eventprop', rule, {
    valid: [
        {
            code: '<Button onClick={() => {console.log("test")}}>text</Button>',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            options: [
                {
                    elementsToCheck: interactiveElements,
                    eventProps: trackableEvents,
                },
            ],
        },
    ],

    invalid: [
        {
            code: '<Button>text</Button>',
            errors: [
                {
                    messageId: 'default',
                    data: {
                        requiredProps: 'data-track-location',
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
                    elementsToCheck: interactiveElements,
                    eventProps: trackableEvents,
                },
            ],
        },
        {
            code: '<Button data-track-name="name">text</Button>',
            errors: [
                {
                    messageId: 'default',
                    data: {
                        requiredProps: 'data-track-location',
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
                    elementsToCheck: interactiveElements,
                    eventProps: trackableEvents,
                },
            ],
        },
        {
            code: '<Button data-track-location="here">text</Button>',
            errors: [
                {
                    messageId: 'default',
                    data: {
                        requiredProps: 'data-track-name',
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
                    elementsToCheck: interactiveElements,
                    eventProps: trackableEvents,
                },
            ],
        },
    ],
});
