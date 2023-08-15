/**
 * @fileoverview Enforce that interactive elements without
 * its own tracking implementation have atleast one event prop
 * @author Yannick van Bladel
 */

import { elementType, hasAnyProp } from 'jsx-ast-utils';
import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { interactiveElements, trackableEvents } from '../configs';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const elementHasRequiredEventProps = ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: 'problem', // `problem`, `suggestion`, or `layout`
        docs: {
            description:
                'Enforce that interactive elements without its own tracking implementation have atleast one event prop',
            recommended: 'recommended',
        },
        fixable: 'code', // Or `code` or `whitespace`
        hasSuggestions: true,
        schema: [
            {
                type: 'object',
                properties: {
                    trackingProps: { type: 'array', items: { type: 'string' } },
                    alternativeTrackingMethodProps: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                    elementsToCheck: {
                        type: 'array',
                        items: { type: 'string' },
                    },
                },
            },
        ],

        messages: {
            default: 'Interactive elements need atleast one event prop',
        },
    },
    defaultOptions: [
        {
            elementsToCheck: interactiveElements,
            eventProps: trackableEvents,
        },
    ],

    create: (context) => {
        const { elementsToCheck, eventProps } = context.options[0];

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        // Check if the element is one of the interactive elements we determened in the config
        const isElementToCheck = (
            node: TSESTree.JSXOpeningElement,
            attributes: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[]
        ) => {
            if (!elementsToCheck.includes(elementType(node))) {
                // make sure the element is one of the elements we want to check
                return false;
            }
            if (hasAnyProp(attributes, eventProps)) {
                // if the element has an alternative tracking method prop, we don't need to check it
                return false;
            }
            return true;
        };

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------
        return {
            JSXOpeningElement: (node) => {
                const { attributes } = node;

                if (!isElementToCheck(node, attributes)) {
                    return;
                }

                context.report({
                    node,
                    messageId: 'default',
                });
            },
        };
    },
});

export default elementHasRequiredEventProps;
