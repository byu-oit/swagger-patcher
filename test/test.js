const {patch} = require('../lib/patcher')
const test = require('tape')

const testData = require('./testData')

test('simple key', assert => {
  {
    const actual = patch(testData.swagger, testData.test1Patch1)
    const expected = testData.test1Result1
    assert.deepEqual(actual, expected, 'Patching 1 simple key worked')
  }

  {
    const actual = patch(testData.swagger, testData.test1Patch2)
    const expected = testData.test1Result2
    assert.deepEqual(actual, expected, 'Patching multiple simple keys worked')
  }

  assert.end()
})

test('compound key', assert => {
  {
    const actual = patch(testData.swagger, testData.test2Patch1)
    const expected = testData.test2Result1
    assert.deepEqual(actual, expected, 'Patching 1 compound key worked')
  }

  {
    const actual = patch(testData.swagger, testData.test2Patch2)
    const expected = testData.test2Result2
    assert.deepEqual(actual, expected, 'Patching array compound key worked')
  }

  {
    const actual = patch(testData.swagger, testData.test2Patch3)
    const expected = testData.test2Result3
    assert.deepEqual(actual, expected, 'Patching multiple compound key worked')
  }

  assert.end()
})
