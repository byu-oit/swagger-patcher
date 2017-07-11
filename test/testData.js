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
      'value': 'Two',
      'description': 'this is example data'
    }
  },
  'field_three': {
    'properties': [
      {
        'description': 'nested object 1',
        'type': 'Object',
        'example': {
          'value': '3.1'
        }
      },
      {
        'description': 'nested object 2',
        'type': 'Object',
        'example': {
          'value': '3.2'
        }
      }
    ]
  }
}

const test1Patch1 = [
  {
    key: 'field_one',
    description: 'The new description'
  }
]

const test1Result1 = ((orig) => {
  const copy = _.cloneDeep(orig)
  copy['field_one']['description'] = 'The new description'
  return copy
})(swagger)

const test1Patch2 = [
  {
    key: 'field_one',
    description: 'The new description'
  },
  {
    key: 'field_two',
    description: 'Field Two\'s updated description'
  }
]

const test1Result2 = ((orig) => {
  const copy = _.cloneDeep(orig)
  copy['field_one']['description'] = 'The new description'
  copy['field_two']['description'] = 'Field Two\'s updated description'
  return copy
})(swagger)

const test2Patch1 = [
  {
    key: 'field_two.example',
    description: 'new example data'
  }
]

const test2Result1 = ((orig) => {
  const copy = _.cloneDeep(orig)
  copy['field_two']['example']['description'] = 'new example data'
  return copy
})(swagger)

const test2Patch2 = [
  {
    key: 'field_three.properties.[0]',
    description: 'updated nested object 1'
  }
]

const test2Result2 = ((orig) => {
  const copy = _.cloneDeep(orig)
  copy['field_three']['properties'][0]['description'] = 'updated nested object 1'
  return copy
})(swagger)

const test2Patch3 = [
  {
    key: 'field_two.example',
    description: 'new example data'
  },
  {
    key: 'field_three.properties.[0]',
    description: 'updated nested object 1'
  },
  {
    key: 'field_three.properties.[1]',
    description: 'updated nested object 2'
  }
]

const test2Result3 = ((orig) => {
  const copy = _.cloneDeep(orig)
  copy['field_two']['example']['description'] = 'new example data'
  copy['field_three']['properties'][0]['description'] = 'updated nested object 1'
  copy['field_three']['properties'][1]['description'] = 'updated nested object 2'
  return copy
})(swagger)

module.exports = {
  swagger,
  test1Patch1,
  test1Result1,
  test1Patch2,
  test1Result2,
  test2Patch1,
  test2Result1,
  test2Patch2,
  test2Result2,
  test2Patch3,
  test2Result3
}
