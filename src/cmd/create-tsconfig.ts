import path from 'path'
import fs from 'fs-extra'
import { createPackage } from './create-package'

export type CreateTSConfigOptions = {
  dir: string
  pkgName: string
}

export const createTSConfig = ({ dir, pkgName }: CreateTSConfigOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(__dirname, '..', 'templates', 'tsconfig')
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)

  createPackage({
    dir: resolvedPath,
    pkgName,
  })
}
