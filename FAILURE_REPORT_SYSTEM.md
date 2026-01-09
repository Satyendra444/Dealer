# Test Failure Reporting System

## Overview
यह system automatically सभी test failures को track करता है और detailed reports generate करता है।

## Files Created

### 1. **utils/testReporter.ts**
- Test failures को JSON format में save करता है
- Formatted text report भी generate करता है
- Interface: `TestFailure` जो हर failure का details रखता है

### 2. **utils/assertions.ts**
- Custom assertions जो failures को report करते हैं
- Methods:
  - `assertEquals()` - Values की comparison करता है
  - `assertTruthy()` - Boolean verification करता है
  - `assertFalsy()` - Negation check करता है
  - `assertIncludes()` - String containment check करता है

### 3. **tests/truck-dealers.spec.ts**
- Updated test file जो CustomAssertions use करता है
- हर test failure automatically captured होती है

## How It Works

1. जब कोई test fail होता है, `CustomAssertions` method call होता है
2. Method failure details को `TestReporter` में add करता है
3. Reporter automatically फाइल में save करता है

## Output Files Generated

### **test-failures.json**
```json
{
  "generatedAt": "2026-01-09T10:30:00.000Z",
  "totalFailures": 5,
  "failures": [
    {
      "testName": "Meta Title Verification",
      "testSuite": "SEO Verification",
      "timestamp": "2026-01-09T10:30:00.000Z",
      "expected": "Truck Dealers & Showrooms in India - Find a Nearby Dealer in Your City",
      "actual": "Some other title",
      "errorMessage": "Expected 'Some other title' to equal 'Truck Dealers & Showrooms in India - Find a Nearby Dealer in Your City'",
      "language": "en"
    }
  ]
}
```

### **test-failures.txt**
```
================================================================================
TEST FAILURE REPORT
================================================================================
Generated: 2026-01-09T10:30:00.000Z
Total Failures: 5
================================================================================

FAILURE #1
--------------------------------------------------------------------------------
Test Suite: SEO Verification
Test Name: Meta Title Verification
Language: en
Timestamp: 2026-01-09T10:30:00.000Z
Error: Expected 'Some other title' to equal 'Truck Dealers & Showrooms in India...'

EXPECTED:
"Truck Dealers & Showrooms in India - Find a Nearby Dealer in Your City"

ACTUAL:
"Some other title"

--------------------------------------------------------------------------------
```

## Usage

```bash
# Tests को run करो
npx playwright test tests/truck-dealers.spec.ts

# Failures को check करो
# Ye automatically generate होंगी:
# - test-failures.json
# - test-failures.txt
```

## Features

✅ Automatic failure capture  
✅ Actual vs Expected comparison  
✅ Detailed error messages  
✅ Language-specific tracking  
✅ Test suite grouping  
✅ Timestamp recording  
✅ JSON और Text दोनों formats  

## Extending the System

नए assertions add करने के लिए `utils/assertions.ts` में नए methods add करो:

```typescript
static assertCustom(
  actual: any,
  expected: any,
  testName: string,
  testSuite: string,
  language: string = 'en'
) {
  try {
    // Your assertion logic
    expect(actual).toMatch(expected);
  } catch (error) {
    testReporter.addFailure({
      testName,
      testSuite,
      timestamp: new Date().toISOString(),
      expected: String(expected),
      actual: String(actual),
      errorMessage: error instanceof Error ? error.message : String(error),
      language,
    });
    throw error;
  }
}
```

## Benefits

1. **Quick Issue Identification** - सभी failures एक जगह
2. **Better Analysis** - Expected vs Actual clearly दिखता है
3. **Bilingual Support** - English और Hindi दोनों के लिए tracking
4. **Structured Reports** - JSON format में easy to parse
5. **Human Readable** - Text format में easy to read
6. **Audit Trail** - हर failure का timestamp
