// strongly inspired from https://marmelab.com/blog/2018/07/18/accessibility-performance-testing-puppeteer.html
import * as axe from 'axe-core'
import { resolve } from 'path'
import { realpathSync, mkdirSync, existsSync } from 'fs'

const PATH_TO_AXE = './node_modules/axe-core/axe.min.js'
const appDirectory = realpathSync(process.cwd())

const resolvePath = relativePath => resolve(appDirectory, relativePath)

export const analyzeAccessibility = async (
  page,
  screenshotPath,
  options = {}
) => {
  await page.addScriptTag({ path: resolvePath(PATH_TO_AXE) })
  const accessibilityReport = await page.evaluate(axeOptions => {
    return new Promise(resolve => {
      setTimeout(resolve, 0)
    }).then(() => axe.run(axeOptions))
  }, options)

  if (
    screenshotPath &&
    (accessibilityReport.violations.length ||
      accessibilityReport.incomplete.length)
  ) {
    const path = `${process.cwd()}/screenshots`
    if (!existsSync(path)) {
      mkdirSync(path)
    }
    await page.screenshot({
      path: `${path}/${screenshotPath}`,
      fullPage: true,
    })
  }

  return accessibilityReport
}
