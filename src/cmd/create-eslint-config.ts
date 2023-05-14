import path from 'path'
import fs from 'fs-extra'
import { createPackage } from './create-package'
import { install } from '../helpers/install'

export type CreateESLintConfigOptions = {
  dir: string
  pkgName: string
}

export const createESLintConfig = ({
  dir,
  pkgName,
}: CreateESLintConfigOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(__dirname, '..', 'templates', 'eslint-config')
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)

  createPackage({
    dir: resolvedPath,
    pkgName,
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
