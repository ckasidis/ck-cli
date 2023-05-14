import { Command } from 'commander'
import { createPackage } from './cmd/create-package'
import { createPrettierConfig } from './cmd/create-prettier-config'
import { createTailwindConfig } from './cmd/create-tailwind-config'
import { createTSConfig } from './cmd/create-tsconfig'
import { createCKApp } from './cmd/create-ck-app'

const program = new Command()

program
  .name('ck-cli')
  .description('CLI for generating templates')
  .version('0.0.1')

program
  .command('ck-app')
  .description(
    'create a new monorepos with Turborepo, Next.js, TSConfig, Prettier Config, ESLint Config, Tailwind Config, Lint-staged, Commitlint, and Husky'
  )
  .argument('<directory>', 'directory')
  .option('-n, --name <string>', 'workspace name')
  .action((dir, options) => {
    createCKApp({ dir: dir || process.cwd(), pkgName: options.name })
  })

program
  .command('pkg')
  .description('create a new package.json file')
  .argument('<directory>', 'directory')
  .option('-n, --name <string>', 'package name')
  .action((dir, options) => {
    createPackage({ dir: dir || process.cwd(), pkgName: options.name })
  })

program
  .command('tsconfig')
  .description('create a new tsconfig package')
  .argument('<directory>', 'directory')
  .option('-n, --name <string>', 'package name')
  .action((dir, options) => {
    createTSConfig({
      dir: dir || process.cwd(),
      pkgName: options.name,
    })
  })

program
  .command('prettier')
  .description('create a new prettier-config package')
  .argument('<directory>', 'directory')
  .option('-n, --name <string>', 'package name')
  .option('-tw, --tailwind', 'install prettier-plugin-tailwindcss')
  .action((dir, options) => {
    createPrettierConfig({
      dir: dir || process.cwd(),
      pkgName: options.name,
      withTailwind: options.tailwind,
    })
  })

program
  .command('tailwind')
  .description('create a new tailwind-config package')
  .argument('<directory>', 'directory')
  .option('-n, --name <string>', 'package name')
  .action((dir, options) => {
    createTailwindConfig({
      dir: dir || process.cwd(),
      pkgName: options.name,
    })
  })

program.parse()
