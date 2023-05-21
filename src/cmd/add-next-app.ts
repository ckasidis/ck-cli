import path from 'path'
import fs from 'fs-extra'

import { install } from '../helpers/install'
import { newPackage } from '../helpers/new-pkg'

export type AddNextAppOptions = {
  dir: string
  workspaceName: string
  withClerk?: boolean
  withDrizzle?: boolean
}

export const addNextApp = ({
  dir,
  workspaceName,
  withClerk,
  withDrizzle,
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

  if (withDrizzle) {
    const withDrizzleCopySource = path.join(
      __dirname,
      '..',
      'templates',
      'next',
      'withDrizzle'
    )
    fs.copySync(withDrizzleCopySource, copyDest)

    const serverActions = path.join(resolvedPath, 'src', 'app', '_actions.ts')
    fs.writeFileSync(
      serverActions,
      fs
        .readFileSync(serverActions, 'utf8')
        .replace('WORKSPACE_NAME', workspaceName)
    )

    const databasePage = path.join(
      resolvedPath,
      'src',
      'app',
      'database',
      'page.tsx'
    )
    fs.writeFileSync(
      databasePage,
      fs
        .readFileSync(databasePage, 'utf8')
        .replace('WORKSPACE_NAME', workspaceName)
    )

    const createUserFormComponent = path.join(
      resolvedPath,
      'src',
      'components',
      'CreateUserForm.tsx'
    )
    fs.writeFileSync(
      createUserFormComponent,
      fs
        .readFileSync(createUserFormComponent, 'utf8')
        .replace('WORKSPACE_NAME', workspaceName)
    )

    const userCardComponent = path.join(
      resolvedPath,
      'src',
      'components',
      'UserCard.tsx'
    )
    fs.writeFileSync(
      userCardComponent,
      fs
        .readFileSync(userCardComponent, 'utf8')
        .replace('WORKSPACE_NAME', workspaceName)
    )
  }

  if (withClerk && withDrizzle) {
    const withClerkAndDrizzleCopySource = path.join(
      __dirname,
      '..',
      'templates',
      'next',
      'withClerkAndDrizzle'
    )
    fs.copySync(withClerkAndDrizzleCopySource, copyDest)
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
    ...(withDrizzle
      ? {
          dependencies: {
            [`@${workspaceName}/db`]: 'workspace:*',
          },
        }
      : {}),
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

  if (withDrizzle) {
    install(['@hookform/resolvers', 'react-hook-form', 'zod'], {
      dir: resolvedPath,
    })
  }
}
