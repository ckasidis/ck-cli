import path from 'path'
import fs from 'fs-extra'

import { install } from '../helpers/install'
import { newPackage } from '../helpers/new-pkg'

export type AddPrettierConfigOptions = {
  dir: string
  workspaceName: string
  withTailwind: boolean
}

export const addPrettierConfig = ({
  dir,
  workspaceName,
  withTailwind,
}: AddPrettierConfigOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(
    __dirname,
    '..',
    'templates',
    'prettier-config',
    withTailwind ? 'withTailwind' : 'base'
  )
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)

  const prettierConfig = path.join(resolvedPath, 'index.js')
  fs.writeFileSync(
    prettierConfig,
    fs
      .readFileSync(prettierConfig, 'utf8')
      .replace('WORKSPACE_NAME', workspaceName)
  )

  newPackage({
    dir: resolvedPath,
    pkgName: `@${workspaceName}/prettier-config`,
    main: './index.js',
    scripts: {
      clean: 'rimraf node_modules',
    },
  })

  install(['rimraf', '@ianvs/prettier-plugin-sort-imports'], {
    dir: resolvedPath,
    devDependencies: true,
  })

  if (withTailwind) {
    install(['prettier-plugin-tailwindcss'], {
      dir: resolvedPath,
      devDependencies: true,
    })
  }
}
