const _ = require('lodash')

const swagger = {
  'field_one': {
    'description': 'The original description',
    'type': 'Object',
    'example': {
      'value': 'One'
    }
  },
  'field_two': {
    'description': 'Field Two\'s original dexription',
    'type': 'Object',
    'example': {
      'value': 'Two'
    }
  },
  'field_three': {
    'description': 'A description for field three',
    'type': 'Object',
    'example': {
      'value': 'Three'
    }
  }
}

const testPatch1 = [
  {
    key: 'field_one',
    description: 'The new description'
  }
]

const testResult1 = _.cloneDeep(swagger)

module.exports = {
  swagger,
  testPatch1,
  testResult1
}
