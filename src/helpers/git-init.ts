import { spawnSync } from 'child_process'
import path from 'path'
import fs from 'fs-extra'

export type GitInitOptions = {
  dir: string
  mainBranch?: boolean
}

export function gitInit({ dir, mainBranch = true }: GitInitOptions) {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const commands = [{ command: 'git', args: ['init'] }]

  if (mainBranch) {
    commands.push({
      command: 'git',
      args: ['branch', '-m', 'master', 'main'],
    })
  }

  commands.forEach(({ command, args }) => {
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
  })
}
