import path from 'path'
import fs from 'fs-extra'
import { CreatePackageConfigOptions, createPackage } from './create-package'
import { install } from '../helpers/install'

export type CreatePrettierConfigOptions = {
  dir: string
  pkgName: string
  withTailwind: boolean
}

export const createPrettierConfig = ({
  dir,
  pkgName,
  withTailwind,
}: CreatePrettierConfigOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(
    __dirname,
    '..',
    'templates',
    'prettier-config',
    withTailwind ? 'tailwind' : 'no-tailwind'
  )
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)

  const base: CreatePackageConfigOptions = {
    dir: resolvedPath,
    pkgName,
    main: './index.js',
  }

  if (withTailwind) {
    createPackage({
      ...base,
      scripts: {
        clean: 'rimraf node_modules',
      },
    })
    install(['rimraf', 'prettier-plugin-tailwindcss'], {
      dir: resolvedPath,
      devDependencies: true,
    })
  } else {
    createPackage(base)
  }
}
