import { ESLintUtils } from '@typescript-eslint/utils';

export const createRule = ESLintUtils.RuleCreator(
    (name: string) =>
        `https://github.com/freshheads/eslint-plugin-freshheads-analytics/tree/main/docs/rules/${name}.md`
);
