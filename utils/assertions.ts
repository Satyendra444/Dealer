import { expect } from '@playwright/test';
import { testReporter } from './testReporter';

export class CustomAssertions {
  static assertEquals(
    actual: any,
    expected: any,
    testName: string,
    testSuite: string,
    language: string = 'en'
  ) {
    try {
      expect(actual).toBe(expected);
    } catch (error) {
      testReporter.addFailure({
        testName,
        testSuite,
        timestamp: new Date().toISOString(),
        expected: JSON.stringify(expected, null, 2),
        actual: JSON.stringify(actual, null, 2),
        errorMessage: error instanceof Error ? error.message : String(error),
        language,
      });
      throw error;
    }
  }

  static assertTruthy(
    actual: any,
    testName: string,
    testSuite: string,
    language: string = 'en'
  ) {
    try {
      expect(actual).toBeTruthy();
    } catch (error) {
      testReporter.addFailure({
        testName,
        testSuite,
        timestamp: new Date().toISOString(),
        expected: 'true',
        actual: String(actual),
        errorMessage: error instanceof Error ? error.message : String(error),
        language,
      });
      throw error;
    }
  }

  static assertFalsy(
    actual: any,
    testName: string,
    testSuite: string,
    language: string = 'en'
  ) {
    try {
      expect(actual).toBeFalsy();
    } catch (error) {
      testReporter.addFailure({
        testName,
        testSuite,
        timestamp: new Date().toISOString(),
        expected: 'false',
        actual: String(actual),
        errorMessage: error instanceof Error ? error.message : String(error),
        language,
      });
      throw error;
    }
  }

  static assertIncludes(
    actual: string,
    expected: string,
    testName: string,
    testSuite: string,
    language: string = 'en'
  ) {
    try {
      expect(actual).toContain(expected);
    } catch (error) {
      testReporter.addFailure({
        testName,
        testSuite,
        timestamp: new Date().toISOString(),
        expected: `Should include: ${expected}`,
        actual: actual,
        errorMessage: error instanceof Error ? error.message : String(error),
        language,
      });
      throw error;
    }
  }
}
