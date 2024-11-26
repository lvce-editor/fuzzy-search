import { test, expect } from '@jest/globals'
import { isPatternInWord } from '../src/parts/IsPatternInWord/IsPatternInWord.ts'

test('pattern is in word when pattern is empty', () => {
  expect(isPatternInWord('', 0, 0, 'hello', 0, 5)).toBe(true)
})

test('pattern is in word when pattern and word are same', () => {
  expect(isPatternInWord('hello', 0, 5, 'hello', 0, 5)).toBe(true)
})

test('pattern is in word when pattern is substring', () => {
  expect(isPatternInWord('hel', 0, 3, 'hello', 0, 5)).toBe(true)
})

test('pattern is not in word when pattern is longer than word', () => {
  expect(isPatternInWord('hello world', 0, 11, 'hello', 0, 5)).toBe(false)
})

test('pattern is not in word when characters do not match', () => {
  expect(isPatternInWord('abc', 0, 3, 'xyz', 0, 3)).toBe(false)
})

test('pattern is in word with partial positions', () => {
  expect(isPatternInWord('hello', 1, 3, 'hello', 1, 4)).toBe(true)
})

test('pattern is not in word with mismatched positions', () => {
  expect(isPatternInWord('hello', 2, 4, 'hello', 0, 2)).toBe(false)
})

test('pattern is in word with non-sequential matches', () => {
  expect(isPatternInWord('hl', 0, 2, 'hello', 0, 5)).toBe(true)
})

test('pattern is case sensitive', () => {
  expect(isPatternInWord('HELLO', 0, 5, 'hello', 0, 5)).toBe(false)
})
