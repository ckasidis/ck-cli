import fs from 'fs-extra'
import path from 'path'
import { NewPackageOptions, newPackage } from '../helpers/new-pkg'
import { install } from '../helpers/install'

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
    withTailwind ? 'tailwind' : 'no-tailwind'
  )
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)

  const base: NewPackageOptions = {
    dir: resolvedPath,
    pkgName: `@${workspaceName}/prettier-config`,
    main: './index.js',
  }

  if (withTailwind) {
    newPackage({
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
    newPackage(base)
  }
}
