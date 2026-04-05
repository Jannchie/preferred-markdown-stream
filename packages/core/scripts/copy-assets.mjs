import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const packageDir = resolve(currentDir, '..')
const sourceFile = resolve(packageDir, 'src/styles.css')
const targetFile = resolve(packageDir, 'dist/styles.css')

await mkdir(dirname(targetFile), { recursive: true })
await copyFile(sourceFile, targetFile)
