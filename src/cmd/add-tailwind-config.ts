import fs from 'fs-extra'
import path from 'path'
import { newPackage } from '../helpers/new-pkg'
import { install } from '../helpers/install'

export type AddTailwindConfigOptions = {
  dir: string
  workspaceName: string
}

export const addTailwindConfig = ({
  dir,
  workspaceName,
}: AddTailwindConfigOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(__dirname, '..', 'templates', 'tailwind-config')
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)

  newPackage({
    dir: resolvedPath,
    pkgName: `@${workspaceName}/tailwind-config`,
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
