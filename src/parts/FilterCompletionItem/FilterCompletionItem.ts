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

const fillRow = (
  row: number,
  pattern: string,
  patternLower: string,
  word: string,
  wordLower: string,
  table: Uint8Array[],
  arrows: Uint8Array[],
  wordLength: number,
): boolean => {
  const rowChar = pattern[row - 1]
  const rowCharLow = patternLower[row - 1]
  let strongMatch = false
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
    strongMatch ||= score > 5
    let diagonalScore = score + table[row - 1][column - 1]
    if (isDiagonalMatch && score !== -1) {
      diagonalScore += 2
    }
    const leftScore = table[row][column - 1]
    const useLeft = leftScore > diagonalScore
    table[row][column] = useLeft ? leftScore : diagonalScore
    arrows[row][column] = useLeft ? Arrow.Left : Arrow.Diagonal
  }
  return strongMatch
}

const fillTable = (
  pattern: string,
  patternLower: string,
  word: string,
  wordLower: string,
  table: Uint8Array[],
  arrows: Uint8Array[],
  patternLength: number,
  wordLength: number,
): boolean => {
  let strongMatch = false
  for (let row = 1; row < patternLength + 1; row++) {
    const isMatch = fillRow(
      row,
      pattern,
      patternLower,
      word,
      wordLower,
      table,
      arrows,
      wordLength,
    )
    if (row === 1) {
      strongMatch ||= isMatch
    }
  }
  return strongMatch
}

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
  const strongMatch = fillTable(
    pattern,
    patternLower,
    word,
    wordLower,
    table,
    arrows,
    patternLength,
    wordLength,
  )
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
