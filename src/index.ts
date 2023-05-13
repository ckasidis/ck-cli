import { Command } from 'commander'
import { createPackageJson } from './cmd/create-package-json'
import { createPrettierConfig } from './cmd/create-prettier-config'

const program = new Command()

program
  .name('ck-cli')
  .description('CLI for generating templates')
  .version('0.0.1')

program
  .command('pkg')
  .description('create a new package.json file')
  .argument('<string>', 'Package Name')
  .action((str) => {
    createPackageJson({ pkgName: str })
  })

program
  .command('prettier')
  .description('create a new prettier-config package')
  .argument('<string>', 'Package Name')
  .action((str) => {
    createPrettierConfig({ pkgName: str })
  })

program.parse()
