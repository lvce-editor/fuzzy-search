// based on https://github.com/microsoft/vscode/blob/3059063b805ed0ac10a6d9539e213386bfcfb852/src/vs/base/common/filters.ts by Microsoft (License MIT)
import * as Arrow from '../Arrow/Arrow.ts'
import * as CreateTable from '../CreateTable/CreateTable.ts'
import * as EmptyMatches from '../EmptyMatches/EmptyMatches.ts'
import * as GetCompletionItemScore from '../GetCompletionItemScore/GetCompletionItemScore.ts'
import * as IsPatternInWord from '../IsPatternInWord/IsPatternInWord.ts'
import * as TraceHighlights from '../TraceHighlights/TraceHighlights.ts'

const gridSize = 128

const table = CreateTable.createTable(gridSize)
const arrows = CreateTable.createTable(gridSize)

export const fuzzySearch = (
  pattern: string,
  word: string,
): readonly number[] => {
  const patternLength = Math.min(pattern.length, gridSize - 1)
  const wordLength = Math.min(word.length, gridSize - 1)
  const patternLower = pattern.toLowerCase()
  const wordLower = word.toLowerCase()
  if (
    !IsPatternInWord.isPatternInWord(
      patternLower,
      0,
      patternLength,
      wordLower,
      0,
      wordLength,
    )
  ) {
    return EmptyMatches.EmptyMatches
  }
  let strongMatch = false
  for (let row = 1; row < patternLength + 1; row++) {
    const rowChar = pattern[row - 1]
    const rowCharLow = patternLower[row - 1]
    for (let column = 1; column < wordLength + 1; column++) {
      const columnChar = word[column - 1]
      const columnCharLow = wordLower[column - 1]
      const columnCharBefore = word[column - 2] || ''
      const isDiagonalMatch = arrows[row - 1][column - 1] === Arrow.Diagonal
      const score = GetCompletionItemScore.getScore(
        rowCharLow,
        rowChar,
        columnCharBefore,
        columnCharLow,
        columnChar,
        isDiagonalMatch,
      )
      if (row === 1 && score > 5) {
        score
        column
        pattern
        strongMatch = true
      }
      let diagonalScore = score + table[row - 1][column - 1]
      if (isDiagonalMatch && score !== -1) {
        diagonalScore += 2
      }
      const leftScore = table[row][column - 1]
      if (leftScore > diagonalScore) {
        table[row][column] = leftScore
        arrows[row][column] = Arrow.Left
      } else {
        table[row][column] = diagonalScore
        arrows[row][column] = Arrow.Diagonal
      }
    }
  }
  if (!strongMatch) {
    return EmptyMatches.EmptyMatches
  }
  const highlights = TraceHighlights.traceHighlights(
    table,
    arrows,
    patternLength,
    wordLength,
  )
  return highlights
}
