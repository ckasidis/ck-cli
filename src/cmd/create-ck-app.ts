import path from 'path'
import { addTSConfig } from './add-tsconfig'
import { addWorkspace } from './add-workspace'
import { addPrettierConfig } from './add-prettier-config'
import { addESLintConfig } from './add-eslint-config'
import { addTailwindConfig } from './add-tailwind-config'
import { addRootConfig } from './add-root-config'
import { addNextApp } from './add-next-app'
import { addDrizzle } from './add-drizzle'

export type CreateCKAppOptions = {
  dir: string
  workspaceName: string
  withClerk?: boolean
  withDrizzle?: boolean
}

export const createCKApp = ({
  dir,
  workspaceName,
  withClerk,
  withDrizzle,
}: CreateCKAppOptions) => {
  addWorkspace({ dir })

  addTSConfig({
    dir: path.join(dir, 'packages', 'tsconfig'),
    workspaceName,
  })

  addPrettierConfig({
    dir: path.join(dir, 'packages', 'prettier-config'),
    workspaceName,
    withTailwind: true,
  })

  addESLintConfig({
    dir: path.join(dir, 'packages', 'eslint-config'),
    workspaceName,
  })

  addTailwindConfig({
    dir: path.join(dir, 'packages', 'tailwind-config'),
    workspaceName,
  })

  if (withDrizzle) {
    addDrizzle({
      dir: path.join(dir, 'packages', 'db'),
      workspaceName,
    })
  }

  addRootConfig({
    dir,
    workspaceName,
    withClerk,
    withDrizzle,
  })

  addNextApp({
    dir: path.join(dir, 'apps', 'web'),
    workspaceName,
    withClerk,
    withDrizzle,
  })
}
