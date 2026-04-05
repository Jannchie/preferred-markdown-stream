import { copyFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const packageDir = path.resolve(currentDir, '..')
const sourceFile = path.resolve(packageDir, 'src/styles.css')
const targetFile = path.resolve(packageDir, 'dist/styles.css')

await mkdir(path.dirname(targetFile), { recursive: true })
await copyFile(sourceFile, targetFile)
