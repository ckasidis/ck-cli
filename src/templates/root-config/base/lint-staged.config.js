module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '*.{html,css,scss,js,jsx,ts,tsx,md,mdx,json,yml,yaml,gql,graphql}': [
    'prettier --write',
  ],
}
