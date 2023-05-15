import { Command } from 'commander'
import { addPrettierConfig } from './cmd/add-prettier-config'
import { addTailwindConfig } from './cmd/add-tailwind-config'
import { addTSConfig } from './cmd/add-tsconfig'
import { createCKApp } from './cmd/create-ck-app'
import { addNextApp } from './cmd/add-next-app'
import { addESLintConfig } from './cmd/add-eslint-config'

const program = new Command()

program
  .name('ck-cli')
  .description('CLI for bootstrapping Monorepos')
  .version('0.0.1')

program
  .command('create-ck-app')
  .description(
    'create a new monorepos with Turborepo, Next.js, TSConfig, Prettier Config, ESLint Config, Tailwind Config, Lint-staged, Commitlint, and Husky'
  )
  .argument('<directory>', 'directory')
  .option('-n, --name <string>', 'workspace name')
  .option('--clerk', 'with Clerk')
  .action((dir, options) => {
    createCKApp({
      dir: dir || process.cwd(),
      workspaceName: options.name,
      withClerk: options.clerk,
    })
  })

program
  .command('add-next-app')
  .description('add a new next app to workspace')
  .argument('<directory>', 'directory')
  .option('-n, --name <string>', 'workspace name')
  .option('--clerk', 'with Clerk')
  .action((dir, options) => {
    addNextApp({
      dir: dir || process.cwd(),
      workspaceName: options.name,
      withClerk: options.clerk,
    })
  })

program
  .command('add-tsconfig')
  .description('add a new tsconfig package to workspace')
  .argument('<directory>', 'directory')
  .option('-n, --name <string>', 'workspace name')
  .action((dir, options) => {
    addTSConfig({
      dir: dir || process.cwd(),
      workspaceName: options.name,
    })
  })

program
  .command('add-prettier')
  .description('add a new prettier-config package to workspace')
  .argument('<directory>', 'directory')
  .option('-n, --name <string>', 'workspace name')
  .option('-tw, --tailwind', 'install and config prettier-plugin-tailwindcss')
  .action((dir, options) => {
    addPrettierConfig({
      dir: dir || process.cwd(),
      workspaceName: options.name,
      withTailwind: options.tailwind,
    })
  })

program
  .command('add-eslint')
  .description('add a new eslint-config package to workspace')
  .argument('<directory>', 'directory')
  .option('-n, --name <string>', 'workspace name')
  .action((dir, options) => {
    addESLintConfig({ dir: dir || process.cwd(), workspaceName: options.name })
  })

program
  .command('add-tailwind')
  .description('add a new tailwind-config package to workspace')
  .argument('<directory>', 'directory')
  .option('-n, --name <string>', 'workspace name')
  .action((dir, options) => {
    addTailwindConfig({
      dir: dir || process.cwd(),
      workspaceName: options.name,
    })
  })

program.parse()
