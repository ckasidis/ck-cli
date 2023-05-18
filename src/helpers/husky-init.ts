import { spawnSync } from 'child_process'
import fs from 'fs-extra'
import path from 'path'

export type HuskyInitOptions = {
  dir: string
  withCommitlint?: boolean
  withLintStaged?: boolean
}

export function huskyInit({
  dir,
  withCommitlint,
  withLintStaged,
}: HuskyInitOptions) {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const commands = [
    { command: 'pnpm', args: ['dlx', 'husky-init'] },
    { command: 'pnpm', args: ['install'] },
    {
      command: 'pnpm',
      args: ['exec', 'rimraf', '.husky/commit-msg', '.husky/pre-commit'],
    },
  ]

  const commitMsgHook = path.join(resolvedPath, '.husky', 'commit-msg')
  if (fs.existsSync(commitMsgHook)) {
    fs.rmSync(commitMsgHook)
  }

  const preCommitHook = path.join(resolvedPath, '.husky', 'pre-commit')
  if (fs.existsSync(preCommitHook)) {
    fs.rmSync(preCommitHook)
  }

  if (withCommitlint) {
    commands.push({
      command: 'pnpm',
      args: [
        'exec',
        'husky',
        'add',
        commitMsgHook,
        'pnpm exec commitlint --edit $1',
      ],
    })
  }

  if (withLintStaged) {
    commands.push({
      command: 'pnpm',
      args: ['exec', 'husky', 'add', preCommitHook, 'pnpm exec lint-staged'],
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
