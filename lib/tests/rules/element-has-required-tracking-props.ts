import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../../rules/element-has-required-tracking-props';

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
import * as mocha from 'mocha';
import {
    interactiveElements,
    trackableEvents,
    trackingProps,
} from '../../configs';

RuleTester.afterAll = mocha.after;
const ruleTester = new RuleTester();

ruleTester.run('element-has-required-tracking-props', rule, {
    valid: [
        {
            code: '<Button data-track-name="name" data-track-location="here">text</Button>',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            options: [
                {
                    elementsToCheck: interactiveElements,
                    alternativeTrackingMethodProps: trackableEvents,
                    trackingProps: trackingProps,
                },
            ],
        },
    ],

    invalid: [
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
                    alternativeTrackingMethodProps: trackableEvents,
                    trackingProps: trackingProps,
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
                    alternativeTrackingMethodProps: trackableEvents,
                    trackingProps: trackingProps,
                },
            ],
        },
    ],
});
