module.exports = {
  root: true,
  extends: ['@WORKSPACE_NAME/eslint-config'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
