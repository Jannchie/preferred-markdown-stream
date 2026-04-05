import jannchie from '@jannchie/eslint-config'
import tsParser from '@typescript-eslint/parser'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default jannchie({
  test: true,
  vue: true,
}).append({
  files: ['**/*.vue'],
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      ecmaVersion: 'latest',
      extraFileExtensions: ['.vue'],
      parser: tsParser,
      sourceType: 'module',
    },
  },
  plugins: {
    vue: vuePlugin,
  },
})
