import path from 'path'
import { addTSConfig } from './add-tsconfig'
import { addWorkspace } from './add-workspace'
import { addPrettierConfig } from './add-prettier-config'
import { addESLintConfig } from './add-eslint-config'
import { addTailwindConfig } from './add-tailwind-config'
import { addRootConfig } from './add-root-config'
import { addNextApp } from './add-next-app'

export type CreateCKAppOptions = {
  dir: string
  workspaceName: string
  withClerk?: boolean
}

export const createCKApp = ({
  dir,
  workspaceName,
  withClerk,
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

  addRootConfig({
    dir,
    workspaceName,
  })

  addNextApp({
    dir: path.join(dir, 'apps', 'web'),
    workspaceName,
    withClerk,
  })
}
