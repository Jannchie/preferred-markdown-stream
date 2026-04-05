import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const isDryRun = process.env.DRY_RUN === '1'
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'
const packages = [
  {
    dir: path.join(rootDir, 'packages/core'),
    name: '@preferred-markdown-stream/core',
  },
  {
    dir: path.join(rootDir, 'packages/vue'),
    name: '@preferred-markdown-stream/vue',
  },
]

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: rootDir,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    ...options,
  }).trim()
}

function readPackageVersion(packageDir) {
  const packageJsonPath = path.join(packageDir, 'package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  return packageJson.version
}

function getPublishedVersion(packageName, version) {
  try {
    const output = run('npm', ['view', `${packageName}@${version}`, 'version', '--json'])
    return output ? JSON.parse(output) : null
  }
  catch (error) {
    const stderr = String(error.stderr || '')
    if (stderr.includes('E404') || stderr.includes('404 Not Found')) {
      return null
    }

    throw error
  }
}

function publishPackage(packageDir) {
  const publishArgs = ['publish', '--access', 'public', '--no-git-checks']

  if (isGitHubActions) {
    publishArgs.push('--provenance')
  }

  if (isDryRun) {
    console.log(`[dry-run] pnpm ${publishArgs.join(' ')} (${packageDir})`)
    return { status: 'dry-run' }
  }

  try {
    const output = execFileSync('pnpm', publishArgs, {
      cwd: packageDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    if (output) {
      process.stdout.write(output)
    }

    return { status: 'published' }
  }
  catch (error) {
    const stdout = String(error.stdout || '')
    const stderr = String(error.stderr || '')
    if (stdout) {
      process.stdout.write(stdout)
    }
    if (stderr) {
      process.stderr.write(stderr)
    }

    if (
      stderr.includes('ERR_PNPM_GIT_UNCLEAN')
      || stderr.includes('You have uncommitted changes')
      || stderr.includes('the current branch is not the publish branch')
    ) {
      throw new Error(`pnpm publish git checks failed for ${packageDir}: ${stderr}`)
    }

    if (
      stderr.includes('previously published versions')
      || stderr.includes('cannot publish over the previously published versions')
      || stderr.includes('Package already exists')
      || stderr.includes('already published')
    ) {
      return { status: 'already-published' }
    }

    throw error
  }
}

for (const currentPackage of packages) {
  const version = readPackageVersion(currentPackage.dir)
  const publishedVersion = getPublishedVersion(currentPackage.name, version)

  if (publishedVersion === version) {
    console.log(`Skipping ${currentPackage.name}@${version}, already published.`)
    continue
  }

  console.log(`Publishing ${currentPackage.name}@${version}...`)
  const result = publishPackage(currentPackage.dir)

  if (result.status === 'already-published') {
    console.log(`Skipping ${currentPackage.name}@${version}, already published.`)
  }
}
