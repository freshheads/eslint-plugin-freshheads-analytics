declare module 'jsx-ast-utils' {
    import { TSESTree } from '@typescript-eslint/utils';

    export function hasProp(
        node: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
        propName: string
    ): boolean;

    export function hasAnyProp(
        node: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
        propNames: string[]
    ): boolean;
    export function getProp(
        node: (TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute)[],
        propName: string
    ): TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute | undefined;

    export function getPropValue(
        attribute: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute
    ): string;

    export function getLiteralPropValue(
        node: TSESTree.JSXAttribute | TSESTree.JSXSpreadAttribute
    ): TSESTree.Literal | TSESTree.JSXExpression;

    export function propName(
        prop: TSESTree.JSXAttribute
    ): TSESTree.JSXIdentifier | TSESTree.JSXNamespacedName;

    export function elementType(
        node: TSESTree.BaseNode
    ): TSESTree.AST_NODE_TYPES;
}

declare module 'axobject-query';
