import path from 'path'
import { createTSConfig } from './create-tsconfig'
import { createWorkspace } from './create-workspace'
import { createPrettierConfig } from './create-prettier-config'
import { createESLintConfig } from './create-eslint-config'
import { createTailwindConfig } from './create-tailwind-config'
import { createRootConfig } from './create-root-config'

export type CreateCKAppOptions = {
  dir: string
  pkgName: string
}

export const createCKApp = ({ dir, pkgName }: CreateCKAppOptions) => {
  createWorkspace({ dir })

  createTSConfig({
    dir: path.join(dir, 'packages', 'tsconfig'),
    pkgName: `@${pkgName}/tsconfig`,
  })

  createPrettierConfig({
    dir: path.join(dir, 'packages', 'prettier-config'),
    pkgName: `@${pkgName}/prettier-config`,
    withTailwind: true,
  })

  createESLintConfig({
    dir: path.join(dir, 'packages', 'eslint-config'),
    pkgName: `@${pkgName}/eslint-config`,
  })

  createTailwindConfig({
    dir: path.join(dir, 'packages', 'tailwind-config'),
    pkgName: `@${pkgName}/tailwind-config`,
  })

  createRootConfig({
    dir,
    pkgName: pkgName,
  })
}
