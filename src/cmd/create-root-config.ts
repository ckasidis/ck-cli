import path from 'path'
import fs from 'fs-extra'
import { createPackage } from './create-package'
import { install } from '../helpers/install'
import { huskyInit } from '../helpers/husky-init'
import { gitInit } from '../helpers/git-init'

export type CreateRootConfigOptions = {
  dir: string
  pkgName: string
}

export const createRootConfig = ({ dir, pkgName }: CreateRootConfigOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(__dirname, '..', 'templates', 'root-config')
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)

  const rootEslintConfig = path.join(resolvedPath, '.eslintrc.js')
  fs.writeFileSync(
    rootEslintConfig,
    fs.readFileSync(rootEslintConfig, 'utf8').replace('PKG_NAME', pkgName)
  )

  const rootPrettierConfig = path.join(resolvedPath, '.prettierrc.js')
  fs.writeFileSync(
    rootPrettierConfig,
    fs.readFileSync(rootPrettierConfig, 'utf8').replace('PKG_NAME', pkgName)
  )

  createPackage({
    dir: resolvedPath,
    pkgName: pkgName,
    scripts: {
      dev: 'turbo run dev',
      build: 'turbo run build',
      lint: 'turbo run lint',
      'check-types': 'turbo run check-types',
      clean: 'turbo run clean && rimraf node_modules',
      format:
        "prettier --write '**/*.{html,css,scss,js,jsx,ts,tsx,md,mdx,json,yml,yaml,gql,graphql}'",
      commit: 'cz',
    },
    devDependencies: {
      [`@${pkgName}/eslint-config`]: 'workspace:*',
      [`@${pkgName}/prettier-config`]: 'workspace:*',
    },
  })

  install(
    [
      'rimraf',
      'turbo',
      '@commitlint/cli',
      '@commitlint/config-conventional',
      '@commitlint/cz-commitlint',
      'commitizen',
      'eslint',
      'lint-staged',
      'prettier',
    ],
    {
      dir: resolvedPath,
      workspace: true,
      devDependencies: true,
    }
  )

  gitInit({
    dir: resolvedPath,
  })

  huskyInit({
    dir: resolvedPath,
    withCommitlint: true,
    withLintStaged: true,
  })
}
