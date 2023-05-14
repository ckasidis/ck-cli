import path from 'path'
import fs from 'fs-extra'
import { createPackage } from './create-package'
import { install } from '../helpers/install'

export type CreateTailwindConfigOptions = {
  dir: string
  pkgName: string
}

export const createTailwindConfig = ({
  dir,
  pkgName,
}: CreateTailwindConfigOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(__dirname, '..', 'templates', 'tailwind-config')
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

  install(['rimraf', 'tailwindcss'], {
    dir: resolvedPath,
    devDependencies: true,
  })
}
