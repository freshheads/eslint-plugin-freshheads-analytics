/**
 * @fileoverview Enforce that interactive elements without
 * its own tracking implementation have all required tracking props
 * @author Yannick van Bladel
 */

import { elementType, hasAnyProp, hasProp } from 'jsx-ast-utils';
import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import {
    interactiveElements,
    trackableEvents,
    trackingProps,
} from '../configs';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const elementHasRequiredTrackingProps = ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: 'problem', // `problem`, `suggestion`, or `layout`
        docs: {
            description:
                'Enforce that interactive elements without its own tracking implementation have all required tracking props',
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
            default:
                "Interactive elements that don't have custom events must have the following attribute defined: {{requiredProps}}",
        },
    },
    defaultOptions: [
        {
            elementsToCheck: interactiveElements,
            alternativeTrackingMethodProps: trackableEvents,
            trackingProps: trackingProps,
        },
    ],

    create: (context) => {
        const {
            elementsToCheck,
            alternativeTrackingMethodProps,
            trackingProps,
        } = context.options[0];

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
            if (hasAnyProp(attributes, alternativeTrackingMethodProps)) {
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
                // check all props for non-existing tracking props, and report them
                trackingProps.forEach((trackingProp) => {
                    if (!hasProp(node.attributes, trackingProp)) {
                        context.report({
                            node,
                            messageId: 'default',
                            data: {
                                requiredProps: trackingProp,
                            },
                            suggest: [
                                {
                                    messageId: 'default',
                                    data: {
                                        requiredProps: trackingProp,
                                    },
                                    fix: (fixer) => {
                                        return fixer.insertTextAfter(
                                            node.attributes[
                                                attributes.length - 1
                                            ],
                                            ` ${trackingProp}=""`
                                        );
                                    },
                                },
                            ],
                        });
                    }
                });
            },
        };
    },
});

export default elementHasRequiredTrackingProps;
