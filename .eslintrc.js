module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/require-prop-types': 'off',
    'no-console': 'off',
    'require-await': 'off',
    'quote-props': 'off',
    'unicorn/escape-case': 'off',
    'camelcase': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/html-self-closing': 'off',
    'quotes': 'off',
    'key-spacing': 'off',
    'comma-spacing': 'off',
    'no-dupe-keys': 'off',
    'vue/html-end-tags': 'off'
  }
}
