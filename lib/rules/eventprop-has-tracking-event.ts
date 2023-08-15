/**
 * @fileoverview check if a event prop contains an tracking event function
 * @author Yannick van Bladel
 */

import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { TSESTree } from '@typescript-eslint/utils';
import { getProp, getPropValue, hasProp } from 'jsx-ast-utils';

import { trackableEvents } from '../configs';
import { createRule } from '../utils/createRule';
import { isIdentifier } from '../utils/ast';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const eventpropHasTrackingEvent = createRule({
    name: 'eventprop-has-tracking-event',
    meta: {
        type: 'suggestion', // `problem`, `suggestion`, or `layout`
        docs: {
            description:
                'check if a event prop contains an tracking event function',
            recommended: 'recommended',
        },
        fixable: 'code', // Or `code` or `whitespace`
        schema: [
            {
                type: 'object',
                properties: {
                    eventsToTrack: { type: 'array', items: { type: 'string' } },
                    trackingFunctionName: { type: 'string' },
                },
            },
        ],
        messages: {
            default:
                '{{interactiveProp}} is missing "{{trackingFunctionName}}" function',
            functionDeclarationNotFound:
                '{{interactiveProp}} is calling "{{FunctionName}}" this function is outside the scope so can\'t be checked',
        },
    },
    defaultOptions: [
        {
            eventsToTrack: trackableEvents,
            trackingFunctionName: 'pushTrackingEvent',
        },
    ],

    create(context) {
        // variables should be defined here
        const { eventsToTrack, trackingFunctionName } = context.options[0];

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        const isTrackingFunctionInBlock = (
            block: TSESTree.BlockStatement
        ): string[] => {
            return block.body.reduce(
                (acc: string[], statement: TSESTree.Statement) => {
                    if (
                        statement.type !== AST_NODE_TYPES.ExpressionStatement ||
                        statement.expression.type !==
                            AST_NODE_TYPES.CallExpression ||
                        !isIdentifier(statement.expression.callee)
                    ) {
                        return acc;
                    }
                    if (
                        statement.expression.callee.name ===
                        trackingFunctionName
                    ) {
                        return [...acc, statement.expression.callee.name];
                    } else {
                        if (!statement.expression.callee.name) {
                            return acc;
                        }
                        const body = findDeclarationBody(
                            statement.expression.callee.name
                        );
                        if (!body) {
                            return acc;
                        }
                        return [...acc, ...isTrackingFunctionInBlock(body)];
                    }
                },
                []
            );
        };

        const findDeclarationBody = (functionName: string) => {
            const functionVariableDeclaration = context
                .getScope()
                .variables.find((variable) => {
                    return variable.name === functionName;
                })?.defs[0]?.node;
            if (
                !functionVariableDeclaration ||
                (functionVariableDeclaration.type !==
                    AST_NODE_TYPES.FunctionDeclaration &&
                    functionVariableDeclaration.type !==
                        AST_NODE_TYPES.VariableDeclarator)
            ) {
                return undefined;
            }
            if (
                functionVariableDeclaration.type ===
                AST_NODE_TYPES.FunctionDeclaration
            ) {
                return functionVariableDeclaration.body;
            }

            if (
                functionVariableDeclaration.type ===
                    AST_NODE_TYPES.VariableDeclarator &&
                functionVariableDeclaration.init
            ) {
                if (
                    functionVariableDeclaration.init.type ===
                        AST_NODE_TYPES.ArrowFunctionExpression &&
                    functionVariableDeclaration.init.body.type ===
                        AST_NODE_TYPES.BlockStatement
                ) {
                    return functionVariableDeclaration.init.body;
                }
            }

            return undefined;
        };

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            JSXOpeningElement: (node) => {
                const props = node.attributes;
                eventsToTrack.forEach((event) => {
                    const isPropFound = hasProp(props, event);
                    if (!isPropFound) {
                        return;
                    }

                    const onEventProp = getProp(props, event);
                    if (
                        !onEventProp || // return on undefined prop
                        onEventProp.type ===
                            AST_NODE_TYPES.JSXSpreadAttribute || // return on spread prop
                        !onEventProp.value // return on empty prop
                    ) {
                        // return on spread prop
                        return;
                    }

                    const propValue = getPropValue(onEventProp);

                    // handles these cases:
                    // <Component onClick={pushTrackingEvent} />
                    // <Component onClick={pushTrackingEvent()} />
                    if (typeof propValue === 'string') {
                        // check if there is a direct call to the tracking function
                        if (propValue.includes(trackingFunctionName)) {
                            return; // prop has the tracking function
                        }

                        // see if the function that is called is part of the component, and if so,
                        // contains the tracking function
                        const declaration = findDeclarationBody(
                            propValue.split('(')[0]
                        );

                        if (!declaration) {
                            context.report({
                                node: onEventProp,
                                messageId: 'functionDeclarationNotFound',
                                data: {
                                    interactiveProp: onEventProp.name.name,
                                    FunctionName: propValue,
                                },
                            });
                            return;
                        }

                        if (
                            isTrackingFunctionInBlock(declaration).length === 0
                        ) {
                            context.report({
                                node: onEventProp,
                                messageId: 'default',
                                data: {
                                    interactiveProp: onEventProp.name.name,
                                    trackingFunctionName,
                                },
                            });
                        }
                        return;
                    }

                    // handles these cases:
                    // <Component onClick={() => pushTrackingEvent()} />
                    // <Component onClick={() => {pushTrackingEvent(); otherFunction(); }} />
                    if (typeof propValue === 'function') {
                        if (
                            onEventProp.value.type !==
                            AST_NODE_TYPES.JSXExpressionContainer
                        ) {
                            return;
                        }

                        if (
                            onEventProp.value.expression.type ===
                            AST_NODE_TYPES.ArrowFunctionExpression
                        ) {
                            // <Component onClick={() => {pushTrackingEvent(); otherFunction(); }} />
                            if (
                                onEventProp.value.expression.body.type ===
                                AST_NODE_TYPES.BlockStatement
                            ) {
                                if (
                                    isTrackingFunctionInBlock(
                                        onEventProp.value.expression.body
                                    ).length === 0
                                ) {
                                    context.report({
                                        node: onEventProp,
                                        messageId: 'default',
                                        data: {
                                            interactiveProp:
                                                onEventProp.name.name,
                                            trackingFunctionName,
                                        },
                                    });
                                }
                                return;
                            }

                            // <Component onClick={() => pushTrackingEvent()} />
                            if (
                                onEventProp.value.expression.body.type ===
                                AST_NODE_TYPES.CallExpression
                            ) {
                                if (
                                    onEventProp.value.expression.body.callee
                                        .type === AST_NODE_TYPES.Identifier &&
                                    onEventProp.value.expression.body.callee
                                        .name === trackingFunctionName
                                ) {
                                    return; // prop has the tracking function
                                } else if (
                                    onEventProp.value.expression.body.callee
                                        .type === AST_NODE_TYPES.Identifier
                                ) {
                                    const declaration = findDeclarationBody(
                                        onEventProp.value.expression.body.callee.name.split(
                                            '('
                                        )[0]
                                    );
                                    if (!declaration) {
                                        context.report({
                                            node: onEventProp,
                                            messageId:
                                                'functionDeclarationNotFound',
                                            data: {
                                                interactiveProp:
                                                    onEventProp.name.name,
                                                FunctionName:
                                                    onEventProp.value.expression
                                                        .body.callee.name,
                                            },
                                        });
                                        return;
                                    }

                                    if (
                                        isTrackingFunctionInBlock(declaration)
                                            .length === 0
                                    ) {
                                        context.report({
                                            node: onEventProp,
                                            messageId: 'default',
                                            data: {
                                                interactiveProp:
                                                    onEventProp.name.name,
                                                trackingFunctionName,
                                            },
                                        });
                                    }
                                    return;
                                }
                            }
                        }
                    }

                    context.report({
                        node: onEventProp,
                        messageId: 'default',
                        data: {
                            interactiveProp: onEventProp.name.name,
                            trackingFunctionName,
                        },
                    });
                });
            },
        };
    },
});

export default eventpropHasTrackingEvent;
