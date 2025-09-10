// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    {
        files: ['src/**/*.{ts,vue}'],
        rules: {
            'import/first': 'off',
            'import/named': 'error',
            'import/namespace': 'error',
            'import/default': 'error',
            'import/export': 'error',
            'import/extensions': 'off',
            'import/no-unresolved': 'off',
            'import/no-extraneous-dependencies': 'off',
            'import/prefer-default-export': 'off',
            'arrow-body-style': 'off',
            'no-return-assign': 'off',
            'max-len': ['warn', 130],
            'no-unused-vars': 'off',
            'vue/multi-word-component-names': 'off',
            'quotes': ['warn', 'single', { avoidEscape: true }],
            'semi': ['warn', 'never'],
            'vue/no-multiple-template-root': 'off',
            'vue/html-indent': ['warn', 2],
            'vue/max-attributes-per-line': ['warn', {
                singleline: 2,
            }],
            'vue/html-self-closing': ['warn', {
                html: {
                    void: 'always',
                },
            }],
            'vue/component-name-in-template-casing': ['warn', 'PascalCase'],
            'vue/first-attribute-linebreak': ['error', {
                singleline: 'beside',
                multiline: 'below',
            }],
            'vue/html-closing-bracket-newline': ['error', {
                singleline: 'never',
                multiline: 'always',
            }],
            'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
        },
    },
)
