import path from 'path'
import fs from 'fs-extra'

import { install } from '../helpers/install'
import { newPackage } from '../helpers/new-pkg'

export type AddESLintConfigOptions = {
  dir: string
  workspaceName: string
}

export const addESLintConfig = ({
  dir,
  workspaceName,
}: AddESLintConfigOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(__dirname, '..', 'templates', 'eslint-config')
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)

  newPackage({
    dir: resolvedPath,
    pkgName: `@${workspaceName}/eslint-config`,
    main: './index.js',
    scripts: {
      clean: 'rimraf node_modules',
    },
  })

  install(
    [
      'rimraf',
      'eslint-config-next',
      'eslint-config-prettier',
      'eslint-config-turbo',
      'eslint-plugin-react',
    ],
    {
      dir: resolvedPath,
      devDependencies: true,
    }
  )
}
