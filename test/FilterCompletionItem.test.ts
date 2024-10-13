// based on tests from https://github.com/jeancroy/fuzz-aldrin-plus/blob/84eac1d73bacbbd11978e6960f4aa89f8396c540/spec/match-spec.coffee by jeancroy (License MIT)

import { expect, test } from '@jest/globals'
import * as FilterCompletionItem from '../src/parts/FilterCompletionItem/FilterCompletionItem.ts'

test('filterCompletionItem - match by word starts', () => {
  expect(FilterCompletionItem.fuzzySearch('fd', 'font-display')).toEqual([
    expect.any(Number),
    0,
    1,
    5,
    6,
  ])
})

test('filterCompletionItem - match by word starts - one character in first match and two characters in second match', () => {
  expect(FilterCompletionItem.fuzzySearch('fdi', 'font-display')).toEqual([
    expect.any(Number),
    0,
    1,
    5,
    7,
  ])
})

test('filterCompletionItem - match by word starts - one character in first match and three characters in second match', () => {
  expect(FilterCompletionItem.fuzzySearch('fdis', 'font-display')).toEqual([
    expect.any(Number),
    0,
    1,
    5,
    8,
  ])
})

test('filterCompletionItem - match by word starts - three characters in second match', () => {
  expect(FilterCompletionItem.fuzzySearch('wra', 'word-wrap')).toEqual([
    expect.any(Number),
    5,
    8,
  ])
})

test('filterCompletionItem - match by word starts - two characters in first match and two characters in second match', () => {
  expect(FilterCompletionItem.fuzzySearch('fodi', 'font-display')).toEqual([
    expect.any(Number),
    0,
    2,
    5,
    7,
  ])
})

test('filterCompletionItem - match by word starts - two partial matches', () => {
  expect(FilterCompletionItem.fuzzySearch('iem', 'items')).toEqual([
    expect.any(Number),
    0,
    1,
    2,
    4,
  ])
})

test('filterCompletionItem - two empty strings', () => {
  expect(FilterCompletionItem.fuzzySearch('', '')).toEqual([])
})

test('filterCompletionItem - word start 2', () => {
  expect(FilterCompletionItem.fuzzySearch('he', 'Hello World')).toEqual([
    expect.any(Number),
    0,
    2,
  ])
})

test('filterCompletionItem - last character', () => {
  expect(FilterCompletionItem.fuzzySearch('d', 'Hello World')).toEqual([])
})

test('prefer whole word to scattered letters 1', () => {
  expect(
    FilterCompletionItem.fuzzySearch('file', 'fiddle gruntfile file'),
  ).toEqual([expect.any(Number), 17, 21])
})

test('prefer whole word to scattered letters 2', () => {
  expect(FilterCompletionItem.fuzzySearch('file', 'fiddle file')).toEqual([
    expect.any(Number),
    7,
    11,
  ])
})

test('prefer whole word to scattered letters 3', () => {
  expect(FilterCompletionItem.fuzzySearch('file', 'find le file')).toEqual([
    expect.any(Number),
    8,
    12,
  ])
})

test('prefer whole word to scattered letters, even without exact matches 1', () => {
  expect(
    FilterCompletionItem.fuzzySearch('filex', 'fiddle gruntfile xfiller'),
  ).toEqual([expect.any(Number), 12, 16, 17, 18])
})

test('prefer whole word to scattered letters, even without exact matches 2', () => {
  expect(
    FilterCompletionItem.fuzzySearch('filex', 'fiddle file xfiller'),
  ).toEqual([expect.any(Number), 7, 11, 12, 13])
})

test('prefer whole word to scattered letters, even without exact matches 3', () => {
  expect(
    FilterCompletionItem.fuzzySearch('filex', 'fine le file xfiller'),
  ).toEqual([expect.any(Number), 8, 12, 13, 14])
})

test('prefer exact match', () => {
  expect(
    FilterCompletionItem.fuzzySearch('file', 'filter gruntfile filler'),
  ).toEqual([expect.any(Number), 12, 16])
})

test('prefer camelCase to scattered letters', () => {
  expect(
    FilterCompletionItem.fuzzySearch('itc', 'ImportanceTableCtrl'),
  ).toEqual([expect.any(Number), 0, 1, 10, 11, 15, 16])
})

test('prefer acronym to scattered letters 1', () => {
  // TODO
  expect(FilterCompletionItem.fuzzySearch('acon', 'action_config')).toEqual([
    expect.any(Number),
    0,
    2,
    8,
    10,
  ])
})

test('prefer acronym to scattered letters 2', () => {
  expect(
    FilterCompletionItem.fuzzySearch('acon', 'application_control'),
  ).toEqual([expect.any(Number), 0, 1, 12, 15])
})

test('filterCompletionItem - middle', () => {
  expect(FilterCompletionItem.fuzzySearch('elwor', 'Hello World')).toEqual([])
})

test('filterCompletionItem - three partial matches', () => {
  expect(FilterCompletionItem.fuzzySearch('mode', 'mask-border')).toEqual([
    expect.any(Number),
    0,
    1,
    6,
    7,
    8,
    10,
  ])
})

test('filterCompletionItem - three partial matches #2', () => {
  expect(FilterCompletionItem.fuzzySearch('core', 'controller')).toEqual([
    expect.any(Number),
    0,
    2,
    4,
    5,
    8,
    9,
  ])
})

test('filterCompletionItem - three camel case matches', () => {
  expect(
    FilterCompletionItem.fuzzySearch('tololo', 'toLocalLowerCase'),
  ).toEqual([expect.any(Number), 0, 4, 7, 9])
})

test('filterCompletionItem - three characters match at start', () => {
  expect(FilterCompletionItem.fuzzySearch('app', 'apply')).toEqual([
    expect.any(Number),
    0,
    3,
  ])
})

test('filterCompletionItem - font-variant-position', () => {
  expect(
    FilterCompletionItem.fuzzySearch('font-posit', 'font-variant-position'),
  ).toEqual([expect.any(Number), 0, 5, 13, 18])
})

test('filterCompletionItem - background-size', () => {
  expect(FilterCompletionItem.fuzzySearch('size', 'background-size')).toEqual([
    expect.any(Number),
    11,
    15,
  ])
})

test('filterCompletionItem - controller_core', () => {
  expect(FilterCompletionItem.fuzzySearch('core', 'controller_core')).toEqual([
    expect.any(Number),
    11,
    15,
  ])
})

test('filterCompletionItem - font-size', () => {
  expect(FilterCompletionItem.fuzzySearch('font', 'font-size')).toEqual([
    expect.any(Number),
    0,
    4,
  ])
})

test('filterCompletionItem - font-language-override', () => {
  expect(
    FilterCompletionItem.fuzzySearch('font', 'font-language-override'),
  ).toEqual([expect.any(Number), 0, 4])
})

test('filterCompletionItem - font-feature-settings', () => {
  expect(
    FilterCompletionItem.fuzzySearch('font', 'font-feature-settings'),
  ).toEqual([expect.any(Number), 0, 4])
})

test('filterCompletionItem - same text', () => {
  expect(FilterCompletionItem.fuzzySearch('font', 'font')).toEqual([
    expect.any(Number),
    0,
    4,
  ])
})

test('filterCompletionItem - no match', () => {
  expect(FilterCompletionItem.fuzzySearch('fd', 'height')).toEqual([])
})

test('filterCompletionItem - odd match', () => {
  expect(FilterCompletionItem.fuzzySearch('font', 'justify-content')).toEqual(
    [],
  )
})

test('filterCompletionItem - match by three word starts', () => {
  expect(
    FilterCompletionItem.fuzzySearch('ffs', 'font-feature-settings'),
  ).toEqual([expect.any(Number), 0, 1, 5, 6, 13, 14])
})

test('filterCompletionItem - match by first word and two word starts', () => {
  expect(
    FilterCompletionItem.fuzzySearch('font-fs', 'font-feature-settings'),
  ).toEqual([expect.any(Number), 0, 6, 13, 14])
})

test('vscode - Unexpected suggestion scoring, #28791', () => {
  expect(FilterCompletionItem.fuzzySearch('_lines', '_lineStarts')).toEqual([
    expect.any(Number),
    0,
    6,
  ])
})

test('vscode - fuzzyScore - ab - abA', () => {
  expect(FilterCompletionItem.fuzzySearch('ab', 'abA')).toEqual([
    expect.any(Number),
    0,
    2,
  ])
})

test('vscode - fuzzyScore - ccm - cacmelCase', () => {
  expect(FilterCompletionItem.fuzzySearch('ccm', 'cacmelCase')).toEqual([
    expect.any(Number),
    0,
    1,
    2,
    4,
  ])
})

test('vscode - fuzzyScore - bti - the_black_knight', () => {
  expect(FilterCompletionItem.fuzzySearch('bti', 'the_black_knight')).toEqual(
    [],
  )
})

test('vscode - fuzzyScore - ccm - camelCase', () => {
  expect(FilterCompletionItem.fuzzySearch('ccm', 'camelCase')).toEqual([])
})

test('vscode - fuzzyScore - cmcm - camelCase', () => {
  expect(FilterCompletionItem.fuzzySearch('cmcm', 'camelCase')).toEqual([])
})

test('vscode - fuzzyScore - BK - the_black_knight', () => {
  expect(FilterCompletionItem.fuzzySearch('BK', 'the_black_knight')).toEqual([
    expect.any(Number),
    4,
    5,
    10,
    11,
  ])
})

test('vscode - fuzzyScore - KeyboardLayout= - KeyboardLayout', () => {
  // TODO
  expect(
    FilterCompletionItem.fuzzySearch('KeyboardLayout=', 'KeyboardLayout'),
  ).toEqual([])
})

test('vscode - fuzzyScore - LLL - SVisualLoggerLogsList', () => {
  expect(
    FilterCompletionItem.fuzzySearch('LLL', 'SVisualLoggerLogsList'),
  ).toEqual([expect.any(Number), 7, 8, 13, 14, 17, 18])
})

test.skip('vscode - fuzzyScore - LLLL - SVilLoLosLi', () => {
  expect(FilterCompletionItem.fuzzySearch('LLLL', 'SVilLoLosLi')).toEqual([])
})

test('vscode - fuzzyScore - LLLL - SVisualLoggerLogsList', () => {
  expect(
    FilterCompletionItem.fuzzySearch('LLLL', 'SVisualLoggerLogsList'),
  ).toEqual([expect.any(Number), 6, 8, 13, 14, 17, 18])
})

test('vscode - fuzzyScore - TEdit - TextEdit', () => {
  expect(FilterCompletionItem.fuzzySearch('TEdit', 'TextEdit')).toEqual([
    expect.any(Number),
    0,
    1,
    4,
    8,
  ])
})

test('vscode - fuzzyScore - TEdit - TextEditor', () => {
  expect(FilterCompletionItem.fuzzySearch('TEdit', 'TextEditor')).toEqual([
    expect.any(Number),
    0,
    1,
    4,
    8,
  ])
})

test('vscode - fuzzyScore - TEdit - Textedit', () => {
  // TODO
  expect(FilterCompletionItem.fuzzySearch('TEdit', 'Textedit')).toEqual([
    expect.any(Number),
    0,
    1,
    4,
    8,
  ])
})

test('vscode - fuzzyScore - TEdit - text_edit', () => {
  // TODO
  expect(FilterCompletionItem.fuzzySearch('TEdit', 'text_edit')).toEqual([
    expect.any(Number),
    0,
    2,
    6,
    9,
  ])
})

test('vscode - fuzzyScore - bkn - the_black_knight', () => {
  expect(FilterCompletionItem.fuzzySearch('bkn', 'the_black_knight')).toEqual([
    expect.any(Number),
    4,
    5,
    10,
    12,
  ])
})

test('vscode - fuzzyScore - bt - the_black_knight', () => {
  expect(FilterCompletionItem.fuzzySearch('bt', 'the_black_knight')).toEqual([
    expect.any(Number),
    4,
    5,
    15,
    16,
  ])
})

test('vscode - fuzzyScore - fdm - findModel', () => {
  expect(FilterCompletionItem.fuzzySearch('fdm', 'findModel')).toEqual([
    expect.any(Number),
    0,
    1,
    3,
    5,
  ])
})

test('vscode - fuzzyScore - fob - foobar', () => {
  expect(FilterCompletionItem.fuzzySearch('fob', 'foobar')).toEqual([
    expect.any(Number),
    0,
    2,
    3,
    4,
  ])
})

test('vscode - fuzzyScore - form - editor.formatOnSave', () => {
  expect(
    FilterCompletionItem.fuzzySearch('form', 'editor.formatOnSave'),
  ).toEqual([expect.any(Number), 7, 11])
})

test('vscode - fuzzyScore - is - ImportStatement', () => {
  expect(FilterCompletionItem.fuzzySearch('is', 'ImportStatement')).toEqual([
    expect.any(Number),
    0,
    1,
    6,
    7,
  ])
})

test('filterCompletionItem - filter out weak match', () => {
  expect(FilterCompletionItem.fuzzySearch('cla', 'oncanplay')).toEqual([])
})
