import spawn from 'cross-spawn'

/**
 * Spawn a package manager installation with PNPM
 *
 * @returns A Promise that resolves once the installation is finished.
 */
export function install(
  dependencies: string[] | null,
  options: { devDependencies?: boolean }
): Promise<void> {
  /**
   * Return a Promise that resolves once the installation is finished.
   */
  return new Promise((resolve, reject) => {
    let command = 'pnpm'

    if (dependencies && dependencies.length) {
      const args = ['install']
      if (options.devDependencies) {
        args.push('-D')
      }
      args.push(...dependencies)
      /**
       * Spawn the installation process.
       */
      const child = spawn(command, args, {
        stdio: 'inherit',
        env: {
          ...process.env,
          ADBLOCK: '1',
          DISABLE_OPENCOLLECTIVE: '1',
          // we set NODE_ENV to development as pnpm skips dev
          // dependencies when production
          NODE_ENV: 'development',
        },
      })
      child.on('close', (code) => {
        if (code !== 0) {
          reject({ command: `${command} ${args.join(' ')}` })
          return
        }
        resolve()
      })
    }
  })
}
