import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'
import jsoncParser from 'jsonc-eslint-parser'
import vueA11y from 'eslint-plugin-vuejs-accessibility'

const baseRules = {
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  'prefer-const': 'error',
}

const vueRules = {
  'vue/multi-word-component-names': 'off',
  'vue/require-default-prop': 'off',
  'vue/html-self-closing': ['error', {
    html: {
      void: 'always',
      normal: 'always',
      component: 'always',
    },
  }],
  'vue/attribute-hyphenation': 'off',
}

const stylisticRules = {
  '@stylistic/quotes': ['error', 'single'],
  '@stylistic/semi': ['error', 'never'],
  '@stylistic/space-before-blocks': ['error', 'always'],
  '@stylistic/space-in-parens': ['error', 'never'],
  'no-extra-semi': 'error',
  'no-multiple-empty-lines': ['error', { max: 1 }],
}

const additionalRules = {
  'no-debugger': 'error',
  'no-trailing-spaces': 'error',
  'eol-last': 'error',
  'comma-dangle': ['error', 'always-multiline'],
  'object-curly-spacing': ['error', 'always'],
  'array-bracket-spacing': ['error', 'never'],
}

const accessibilityRules = {
  'vuejs-accessibility/alt-text': 'warn',
  'vuejs-accessibility/click-events-have-key-events': 'warn',
  'vuejs-accessibility/form-control-has-label': 'warn',
  'vuejs-accessibility/interactive-supports-focus': 'warn',
  'vuejs-accessibility/mouse-events-have-key-events': 'warn',
  'vuejs-accessibility/tabindex-no-positive': 'warn',
  'vuejs-accessibility/anchor-has-content': 'warn',
  'vuejs-accessibility/heading-has-content': 'warn',
  'vuejs-accessibility/no-redundant-roles': 'warn',
  'vuejs-accessibility/media-has-caption': 'warn',
  'vuejs-accessibility/iframe-has-title': 'warn',
}

export default withNuxt(
  {
    plugins: {
      '@stylistic': stylistic,
      'vuejs-accessibility': vueA11y,
    },
    rules: {
      ...baseRules,
      ...vueRules,
      ...stylisticRules,
      ...additionalRules,
      ...accessibilityRules,
    },
  },
  {
    files: ['**/*.json', '**/*.jsonc'],
    languageOptions: {
      parser: jsoncParser,
    },
    rules: {
      'comma-dangle': ['error', 'never'],
      '@stylistic/quotes': 'off',
      '@stylistic/semi': 'off',
      '@stylistic/space-before-blocks': 'off',
      '@stylistic/space-in-parens': 'off',
      'no-unused-vars': 'off',
    },
  },
)
