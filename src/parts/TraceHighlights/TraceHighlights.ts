// based on https://github.com/microsoft/vscode/blob/3059063b805ed0ac10a6d9539e213386bfcfb852/src/vs/base/common/filters.ts by Microsoft (License MIT)
import * as Arrow from '../Arrow/Arrow.ts'

export const traceHighlights = (
  table: readonly Uint8Array[],
  arrows: readonly Uint8Array[],
  patternLength: number,
  wordLength: number,
): readonly number[] => {
  const skipLeft = (
    rowStart: number,
    columnStart: number,
  ): readonly [number, number] => {
    let row = rowStart
    let column = columnStart
    while (row >= 1 && column >= 1 && arrows[row][column] === Arrow.Diagonal) {
      row--
      column--
    }
    return [row, column]
  }

  let row = patternLength
  let column = wordLength
  const matches = []
  while (row >= 1 && column >= 1) {
    const arrow = arrows[row][column]
    if (arrow === Arrow.Left) {
      column--
      continue
    }
    if (arrow !== Arrow.Diagonal) {
      break
    }
    const start = column
    ;[row, column] = skipLeft(row - 1, column - 1)
    matches.unshift(column, start)
  }
  matches.unshift(table[patternLength][wordLength - 1])
  return matches
}
