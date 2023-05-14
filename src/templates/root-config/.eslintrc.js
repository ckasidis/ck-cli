module.exports = {
  root: true,
  extends: ['@PKG_NAME/eslint-config'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
