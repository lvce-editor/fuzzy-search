import { test, expect } from '@jest/globals'
import { isLowerCase } from '../src/parts/IsLowerCase/IsLowerCase.ts'

test('IsLowerCase returns true for lowercase strings', () => {
  expect(isLowerCase('hello')).toBe(true)
  expect(isLowerCase('world')).toBe(true)
  expect(isLowerCase('abc123')).toBe(true)
})

test('IsLowerCase returns false for strings with uppercase characters', () => {
  expect(isLowerCase('Hello')).toBe(false)
  expect(isLowerCase('WORLD')).toBe(false)
  expect(isLowerCase('helloWorld')).toBe(false)
})

test('IsLowerCase returns true for empty string', () => {
  expect(isLowerCase('')).toBe(true)
})

test('IsLowerCase returns true for strings with special characters and numbers', () => {
  expect(isLowerCase('hello123')).toBe(true)
  expect(isLowerCase('hello!@#')).toBe(true)
  expect(isLowerCase('123!@#')).toBe(true)
})

test('IsLowerCase returns false for strings with any uppercase character', () => {
  expect(isLowerCase('hello World')).toBe(false)
  expect(isLowerCase('helloW')).toBe(false)
  expect(isLowerCase('HELLO')).toBe(false)
})
