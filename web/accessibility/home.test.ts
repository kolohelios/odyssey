// strongly inspired from https://marmelab.com/blog/2018/07/18/accessibility-performance-testing-puppeteer.html
import { printReceived } from 'jest-matcher-utils'
import * as puppeteer from 'puppeteer'

import { analyzeAccessibility } from './accessibility'

const defaultOptions = {
  violationsThreshold: 0,
  incompleteThreshold: 0,
}

const printInvalidNode = node =>
  `- ${printReceived(node.html)}\n\t${node.any
    .map(check => check.message)
    .join('\n\t')}`

const printInvalidRule = rule =>
  `${printReceived(rule.help)} on ${
    rule.nodes.length
  } nodes\r\n${rule.nodes.map(printInvalidNode).join('\n')}`

expect.extend({
  toHaveNoAccessibilityIssues(accessibilityReport, options) {
    let violations = []
    let incomplete = []
    const finalOptions = Object.assign({}, defaultOptions, options)

    if (
      accessibilityReport.violations.length > finalOptions.violationsThreshold
    ) {
      violations = [
        `Expected to have no more than ${
          finalOptions.violationsThreshold
        } violations. Detected ${
          accessibilityReport.violations.length
        } violations:\n`,
      ].concat(accessibilityReport.violations.map(printInvalidRule))
    }

    if (
      finalOptions.incompleteThreshold !== false &&
      accessibilityReport.incomplete.length > finalOptions.incompleteThreshold
    ) {
      incomplete = [
        `Expected to have no more than ${
          finalOptions.incompleteThreshold
        } incomplete. Detected ${
          accessibilityReport.incomplete.length
        } incomplete:\n`,
      ].concat(accessibilityReport.incomplete.map(printInvalidRule))
    }

    const message = [].concat(violations, incomplete).join('\n')
    const pass =
      accessibilityReport.violations.length <=
        finalOptions.violationsThreshold &&
      (finalOptions.incompleteThreshold === false ||
        accessibilityReport.incomplete.length <=
          finalOptions.incompleteThreshold)

    return {
      pass,
      message: () => message,
    }
  },
})

describe('Home page', () => {
  let page
  beforeAll(async () => {
    const browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 1024 })
  })

  it('should not have accessibility issues', async () => {
    await page.goto('http://localhost:4444', { waitUntil: 'load' })
    const accessibilityReport = await analyzeAccessibility(
      page,
      `home.accessibility.png`
    )

    expect(accessibilityReport).toHaveNoAccessibilityIssues()
  })
})
