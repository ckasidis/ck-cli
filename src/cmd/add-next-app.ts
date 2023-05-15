import fs from 'fs-extra'
import path from 'path'
import { install } from '../helpers/install'
import { newPackage } from '../helpers/new-pkg'

export type AddNextAppOptions = {
  dir: string
  workspaceName: string
  withClerk?: boolean
}

export const addNextApp = ({
  dir,
  workspaceName,
  withClerk,
}: AddNextAppOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(__dirname, '..', 'templates', 'next', 'base')
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)

  if (withClerk) {
    const withClerkCopySource = path.join(
      __dirname,
      '..',
      'templates',
      'next',
      'withClerk'
    )
    fs.copySync(withClerkCopySource, copyDest)
  }

  const nextTailwindConfig = path.join(resolvedPath, 'tailwind.config.js')
  fs.writeFileSync(
    nextTailwindConfig,
    fs
      .readFileSync(nextTailwindConfig, 'utf8')
      .replace('WORKSPACE_NAME', workspaceName)
  )

  const nextTSConfig = path.join(resolvedPath, 'tsconfig.json')
  fs.writeFileSync(
    nextTSConfig,
    fs
      .readFileSync(nextTSConfig, 'utf8')
      .replace('WORKSPACE_NAME', workspaceName)
  )

  const pkgName = path.basename(resolvedPath)

  newPackage({
    dir: resolvedPath,
    pkgName,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint',
      'check-types': 'tsc --noEmit',
      clean: 'rimraf node_modules .turbo .next tsconfig.tsbuildinfo',
    },
    devDependencies: {
      [`@${workspaceName}/tailwind-config`]: 'workspace:*',
      [`@${workspaceName}/tsconfig`]: 'workspace:*',
    },
  })

  install(['next', 'react', 'react-dom'], {
    dir: resolvedPath,
  })

  install(
    [
      'rimraf',
      '@types/node',
      '@types/react',
      '@types/react-dom',
      'autoprefixer',
      'postcss',
      'tailwindcss',
      'typescript',
    ],
    {
      dir: resolvedPath,
      devDependencies: true,
    }
  )

  if (withClerk) {
    install(['@clerk/nextjs'], { dir: resolvedPath })
  }
}
