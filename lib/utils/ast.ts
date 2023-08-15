import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import { RuleContext } from '@typescript-eslint/utils/ts-eslint';

export const isNodeOfOneOf = <T>(
    node: TSESTree.Node,
    types: readonly T[]
): node is TSESTree.Node & { type: T } => {
    return types.includes(node.type as T);
};

export const isIdentifier = (
    node: TSESTree.Node
): node is TSESTree.Identifier => {
    return node.type === AST_NODE_TYPES.Identifier;
};

export const isFunctionLikeExpression = (
    node: TSESTree.Node
): node is TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression => {
    return (
        node.type === 'FunctionExpression' ||
        node.type === 'ArrowFunctionExpression'
    );
};

export const isFunction = (
    node: TSESTree.Node
): node is TSESTree.FunctionExpression | TSESTree.FunctionDeclaration => {
    return (
        node.type === 'FunctionExpression' ||
        node.type === 'FunctionDeclaration'
    );
};

export const isFunctionLike = (
    node: TSESTree.Node
): node is
    | TSESTree.FunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.ArrowFunctionExpression => {
    return (
        node.type === 'FunctionDeclaration' || isFunctionLikeExpression(node)
    );
};

export const getFunctionAncestor = (
    context: Readonly<RuleContext<string, readonly unknown[]>>
) => {
    return context.getAncestors().find((x) => {
        if (x.type === AST_NODE_TYPES.FunctionDeclaration) {
            return true;
        }

        return (
            x.parent?.type === AST_NODE_TYPES.VariableDeclarator &&
            x.parent.id.type === AST_NODE_TYPES.Identifier &&
            isNodeOfOneOf(x, [
                AST_NODE_TYPES.FunctionDeclaration,
                AST_NODE_TYPES.FunctionExpression,
                AST_NODE_TYPES.ArrowFunctionExpression,
            ])
        );
    });
};

export const getReferencedExpressionByIdentifier = (params: {
    node: TSESTree.Node;
    context: Readonly<RuleContext<string, readonly unknown[]>>;
}) => {
    const { node, context } = params;

    const resolvedNode = context
        .getScope()
        .references.find((ref) => ref.identifier === node)?.resolved
        ?.defs[0]?.node;

    if (resolvedNode?.type !== AST_NODE_TYPES.VariableDeclarator) {
        return null;
    }

    return resolvedNode.init;
};
