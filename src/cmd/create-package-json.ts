import fs from 'fs'
import os from 'os'
import path from 'path'

type CreatePackageJsonConfig = {
  dir?: string
  pkgName: string
}

export const createPackageJson = ({
  dir = process.cwd(),
  pkgName,
}: CreatePackageJsonConfig) => {
  const packageJson = {
    name: pkgName,
    version: '0.0.0',
    license: 'MIT',
    private: true,
  }

  fs.writeFileSync(
    path.join(dir, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  )
}
