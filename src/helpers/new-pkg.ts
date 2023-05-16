import fs from 'fs-extra'
import os from 'os'
import path from 'path'

export type NewPackageOptions = {
  dir: string
  pkgName: string
  main?: string
  module?: string
  types?: string
  files?: string[]
  scripts?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export const newPackage = ({
  dir,
  pkgName,
  main,
  module,
  types,
  files,
  scripts,
  dependencies,
  devDependencies,
}: NewPackageOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const packageJson: Record<string, unknown> = {
    name: pkgName,
    version: '0.0.0',
    license: 'MIT',
    private: true,
    ...(main ? { main } : {}),
    ...(module ? { module } : {}),
    ...(types ? { types } : {}),
    ...(files ? { files } : {}),
    ...(scripts ? { scripts } : {}),
    ...(dependencies ? { dependencies } : {}),
    ...(devDependencies ? { devDependencies } : {}),
  }

  fs.writeFileSync(
    path.join(resolvedPath, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  )
}
