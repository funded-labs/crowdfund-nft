const { ESLint } = require('eslint')

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const isIgnored = await Promise.all(
    files.map((file) => {
      return eslint.isPathIgnored(file)
    }),
  )

  return files.filter((_, i) => !isIgnored[i])
}

module.exports = {
  '**/*.{ts,tsx,js,jsx}': async (files) => {
    const filesToLint = await removeIgnoredFiles(files)

    return [`prettier --write ${files.join(' ')}`]
  },
  '*.{scss,css,md}': 'prettier --write',
}
