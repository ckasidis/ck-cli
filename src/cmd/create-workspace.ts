import path from 'path'
import fs from 'fs-extra'

export type CreateWorkspaceOptions = {
  dir: string
}

export const createWorkspace = ({ dir }: CreateWorkspaceOptions) => {
  const resolvedPath = path.resolve(dir)

  if (!fs.existsSync(resolvedPath)) {
    fs.mkdirSync(resolvedPath, { recursive: true })
  }

  const copySource = path.join(__dirname, '..', 'templates', 'workspace')
  const copyDest = resolvedPath
  fs.copySync(copySource, copyDest)
}
