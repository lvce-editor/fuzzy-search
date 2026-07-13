import { test, expect } from '@jest/globals'
import * as Arrow from '../src/parts/Arrow/Arrow.ts'
import * as TraceHighlights from '../src/parts/TraceHighlights/TraceHighlights.ts'

test('traceHighlights - stops at non-diagonal and non-left arrow', () => {
  const table = [new Uint8Array(2), new Uint8Array(2)]
  const arrows = [new Uint8Array(2), new Uint8Array(2)]
  table[1][0] = 42
  arrows[1][1] = 0
  expect(TraceHighlights.traceHighlights(table, arrows, 1, 1)).toEqual([42])
})

test('traceHighlights - skips over diagonal section before stop', () => {
  const table = [new Uint8Array(3), new Uint8Array(3), new Uint8Array(3)]
  const arrows = [new Uint8Array(3), new Uint8Array(3), new Uint8Array(3)]
  table[2][1] = 99
  arrows[2][2] = Arrow.Diagonal
  arrows[1][1] = Arrow.Diagonal
  arrows[1][0] = 0
  expect(TraceHighlights.traceHighlights(table, arrows, 2, 2)).toEqual([
    99, 0, 2,
  ])
})
