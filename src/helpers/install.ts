import { spawnSync } from 'child_process'
import path from 'path'
import fs from 'fs-extra'

export type InstallOptions = {
  dir: string
  devDependencies?: boolean
  workspace?: boolean
}

export function install(
  dependencies: string[] | null,
  { dir, devDependencies, workspace }: InstallOptions
) {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  let command = 'pnpm'

  if (!dependencies || !dependencies.length) {
    console.error('No dependencies to install!')
    return
  }

  const args = ['install']

  if (workspace) {
    args.push('-w')
  }

  if (devDependencies) {
    args.push('-D')
  }

  args.push(...dependencies)

  spawnSync(command, args, {
    cwd: resolvedPath,
    stdio: 'inherit',
    env: {
      ...process.env,
      ADBLOCK: '1',
      DISABLE_OPENCOLLECTIVE: '1',
      NODE_ENV: 'development',
    },
  })
}
