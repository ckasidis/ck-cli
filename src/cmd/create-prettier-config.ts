import path from 'path'
import fs from 'fs-extra'
import { createPackageJson } from './create-package-json'
import { install } from '../helpers/install'

type CreatePrettierConfig = {
  dir?: string
  pkgName: string
}

export const createPrettierConfig = ({
  dir = process.cwd(),
  pkgName,
}: CreatePrettierConfig) => {
  const copySource = path.join(__dirname, '..', 'templates', 'prettier-config')
  const copyDest = dir
  fs.copySync(copySource, copyDest)

  createPackageJson({ dir, pkgName: `@${pkgName}/prettier-config` })

  install(['prettier-plugin-tailwindcss'], { devDependencies: true })
}
