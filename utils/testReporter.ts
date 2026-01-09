import * as fs from 'fs';
import * as path from 'path';

export interface TestFailure {
  testName: string;
  testSuite: string;
  timestamp: string;
  expected: string;
  actual: string;
  errorMessage: string;
  language: string;
}

export class TestReporter {
  private failureLog: TestFailure[] = [];
  private failureFilePath: string;

  constructor() {
    this.failureFilePath = path.join(process.cwd(), 'test-failures.json');
    this.clearPreviousLog();
  }

  private clearPreviousLog() {
    if (fs.existsSync(this.failureFilePath)) {
      fs.unlinkSync(this.failureFilePath);
    }
  }

  addFailure(failure: TestFailure) {
    this.failureLog.push(failure);
    this.saveToFile();
  }

  private saveToFile() {
    const reportData = {
      generatedAt: new Date().toISOString(),
      totalFailures: this.failureLog.length,
      failures: this.failureLog,
    };

    fs.writeFileSync(
      this.failureFilePath,
      JSON.stringify(reportData, null, 2),
      'utf-8'
    );

    // Also create a formatted HTML/Text report
    this.createFormattedReport();
  }

  private createFormattedReport() {
    const reportPath = path.join(process.cwd(), 'test-failures.txt');
    let reportContent = '='.repeat(80) + '\n';
    reportContent += 'TEST FAILURE REPORT\n';
    reportContent += '='.repeat(80) + '\n';
    reportContent += `Generated: ${new Date().toISOString()}\n`;
    reportContent += `Total Failures: ${this.failureLog.length}\n`;
    reportContent += '='.repeat(80) + '\n\n';

    this.failureLog.forEach((failure, index) => {
      reportContent += `FAILURE #${index + 1}\n`;
      reportContent += '-'.repeat(80) + '\n';
      reportContent += `Test Suite: ${failure.testSuite}\n`;
      reportContent += `Test Name: ${failure.testName}\n`;
      reportContent += `Language: ${failure.language}\n`;
      reportContent += `Timestamp: ${failure.timestamp}\n`;
      reportContent += `Error: ${failure.errorMessage}\n\n`;
      reportContent += `EXPECTED:\n${failure.expected}\n\n`;
      reportContent += `ACTUAL:\n${failure.actual}\n\n`;
      reportContent += '-'.repeat(80) + '\n\n';
    });

    fs.writeFileSync(reportPath, reportContent, 'utf-8');
  }

  getFailures(): TestFailure[] {
    return this.failureLog;
  }

  getFailureCount(): number {
    return this.failureLog.length;
  }
}

export const testReporter = new TestReporter();
