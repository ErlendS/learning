const test = require('ava');
const R = require('ramda');
const { validateStack } = require('../lifecycles.js');

test('validateStack - returns true if tableStack is empty', t =>{
  const state = {
    tableStack: []
  }
  const actual = validateStack(state)
  t.true(actual)
})

test('validateStack - returns true when values progress in corrct logic ', t =>{
  const state = {
    tableStack: ['S_2', 'S_2', 'D_5', 'H_11', 'S_14']
  }
  const actual = validateStack(state)

  t.true(actual)
})


test('validateStack - returns false when lower value comes after higher', t =>{
  const state = {
    tableStack: ['S_2', 'S_2', 'D_5', 'S_4']
  }
  const actual = validateStack(state)

  const expected = false
  t.true(actual === expected)
})


test('validateStack - returns false when part one part of stack is false', t =>{
  const state = {
    tableStack: ['S_2', 'S_2', 'D_5', 'S_4', 'S_6', 'S_8', 'S_13']
  }
  const actual = validateStack(state)

  const expected = false
  t.true(actual === expected)
})

test('validateStack - returns false when a card comes after 4 in a row in gt mode', t =>{
  const state = {
    tableStack: ['S_2', 'S_2', 'D_2', 'S_2', 'S_6']
  }
  const actual = validateStack(state)

  const expected = false
  t.true(actual === expected)
})

test('validateStack - returns true when last cards is 4 in a row, in lt mode ', t =>{
  const state = {
    tableStack: ['S_2', 'S_7', 'D_3', 'S_7', 'S_7', 'S_7', 'S_7']
  }
  const actual = validateStack(state)

  const expected = true
  t.true(actual === expected)
})

test('validateStack - returns true when last cards is 4 in a row, in gt mode ', t =>{
  const state = {
    tableStack: ['S_2', 'S_3', 'D_3', 'S_8', 'S_8', 'S_8', 'S_8']
  }
  const actual = validateStack(state)

  const expected = true
  t.true(actual === expected)
})

test('validateStack - returns false when a card comes after 4 in a row, in lt mode ', t =>{
  const state = {
    tableStack: ['S_2', 'S_7', 'D_3', 'S_7', 'S_7', 'S_7', 'S_7', 'S_4']
  }
  const actual = validateStack(state)

  const expected = false
  t.true(actual === expected)
})


test('validateStack - respects 7 rule', t =>{
  const state = {
    tableStack: ['S_2', 'S_2', 'D_5', 'S_7', 'S_6', 'S_8', 'S_13']
  }
  const actual = validateStack(state)

  const expected = true
  t.true(actual === expected)
})


test('validateStack -  7 rule is still active when 3 comes after 7 ', t =>{
  const state = {
    tableStack: ['S_2', 'S_7', 'S_3', 'S_8']
  }
  const actual = validateStack(state)

  const expected = false
  t.true(actual === expected)
})


test('validateStack - respects 7 rule when 3 follows  ', t =>{
  const state = {
    tableStack: ['S_2', 'S_7', 'S_3', 'S_7']
  }
  const actual = validateStack(state)

  const expected = true
  t.true(actual === expected)
})

test('validateStack - respects 7 rule also when 3 follows twice ', t =>{
  const state = {
    tableStack: ['S_2', 'S_7', 'S_3', 'D_3', 'S_7']
  }
  const actual = validateStack(state)

  const expected = true
  t.true(actual === expected)
})

test('validateStack - three represent prev card ', t =>{
  const state = {
    tableStack: ['S_2', 'S_3', 'S_6']
  }
  const actual = validateStack(state)

  const expected = true
  t.true(actual === expected)
})

test('validateStack - respects prevCard even after multiple threes', t =>{
  const state = {
    tableStack: ['S_2', 'S_3', 'S_6', 'S_3', 'S_3', 'S_3', 'S_6']
  }
  const actual = validateStack(state)

  const expected = true
  t.true(actual === expected)
})
