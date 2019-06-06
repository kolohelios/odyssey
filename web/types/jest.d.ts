declare namespace jest {
  interface Matchers<R> {
    toHaveNoAccessibilityIssues(): CustomMatcherResult;
  }
}
