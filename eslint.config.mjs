import withNuxt from './.nuxt/eslint.config.mjs'

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
}

const stylisticRules = {
  '@stylistic/quotes': ['error', 'single'],
  '@stylistic/semi': ['error', 'never'],
  '@stylistic/space-before-blocks': ['error', 'always'],
  '@stylistic/space-in-parens': ['error', 'never'],

  'no-extra-semi': 'error',
  'no-multiple-empty-lines': ['error', { max: 1 }],
}

export default withNuxt(
  {
    rules: {
      ...baseRules,
      ...vueRules,
      ...stylisticRules,
    },
  },
)
