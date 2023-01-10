import fs from 'fs'
import path from 'path'

// PAGES_PATH is useful when you want to get the path to a specific file
export const PAGES_PATH = path.join(process.cwd(), '_pages')

// pageFilePaths is the list of all mdx files inside the PAGES_PATH directory
export const pageFilePaths = fs
  .readdirSync(PAGES_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))
