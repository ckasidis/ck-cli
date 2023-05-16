import fs from 'fs-extra'
import path from 'path'
import { install } from '../helpers/install'
import { newPackage } from '../helpers/new-pkg'

export type AddDrizzleOptions = {
  dir: string
  workspaceName: string
}

export const addDrizzle = ({ dir, workspaceName }: AddDrizzleOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(__dirname, '..', 'templates', 'drizzle')
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)

  const drizzleTSConfig = path.join(resolvedPath, 'tsconfig.json')
  fs.writeFileSync(
    drizzleTSConfig,
    fs
      .readFileSync(drizzleTSConfig, 'utf8')
      .replace('WORKSPACE_NAME', workspaceName)
  )

  newPackage({
    dir: resolvedPath,
    pkgName: `@${workspaceName}/db`,
    main: './dist/index.js',
    module: './dist/index.mjs',
    types: './dist/index.d.ts',
    files: ['dist/**'],
    scripts: {
      'db-generate': 'drizzle-kit generate:pg',
      dev: 'tsup --watch',
      build: 'tsup',
      'check-types': 'tsc --noEmit',
      clean: 'rimraf node_modules .turbo dist',
    },
    devDependencies: {
      [`@${workspaceName}/tsconfig`]: 'workspace:*',
    },
  })

  install(['@vercel/postgres', 'drizzle-orm'], {
    dir: resolvedPath,
  })

  install(['rimraf', 'drizzle-kit', 'tsup'], {
    dir: resolvedPath,
    devDependencies: true,
  })
}
