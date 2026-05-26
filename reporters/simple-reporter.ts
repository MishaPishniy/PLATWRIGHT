import type {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
} from '@playwright/test/reporter';

class SimpleReporter implements Reporter {
  private passed = 0;
  private failed = 0;
  private skipped = 0;

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Запускаємо ${suite.allTests().length} тестів`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'passed') {
      this.passed++;
    }

    if (result.status === 'failed' || result.status === 'timedOut') {
      this.failed++;
    }

    if (result.status === 'skipped') {
      this.skipped++;
    }

    console.log(`${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult) {
    console.log('--- Test Summary ---');
    console.log(`Passed: ${this.passed}`);
    console.log(`Failed: ${this.failed}`);
    console.log(`Skipped: ${this.skipped}`);
    console.log(`Final status: ${result.status}`);
  }
}

export default SimpleReporter;