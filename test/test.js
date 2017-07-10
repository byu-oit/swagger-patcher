const {patch} = require('../lib/patcher')
const test = require('tape')

const testData = require('./testData')

test('simple key', assert => {
  {
    const actual = patch(testData.swagger, testData.testPatch1)
    const expected = testData.testResult1
    assert.deepEqual(actual, expected, 'Patching 1 simple key worked')
  }

  assert.end()
})
