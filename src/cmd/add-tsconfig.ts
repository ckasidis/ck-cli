import fs from 'fs-extra'
import path from 'path'
import { newPackage } from '../helpers/new-pkg'

export type AddTSConfigOptions = {
  dir: string
  workspaceName: string
}

export const addTSConfig = ({ dir, workspaceName }: AddTSConfigOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(__dirname, '..', 'templates', 'tsconfig')
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)

  newPackage({
    dir: resolvedPath,
    pkgName: `@${workspaceName}/tsconfig`,
  })
}
