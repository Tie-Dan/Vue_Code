module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    // 名称:['error/off',配置项目参数]
    // 'semi':['off','always'],
    // 'space-before-function-paren': ['error', 'never'],
    // 'no-multiple-empty-lines': ['error', { 'max': 3 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
