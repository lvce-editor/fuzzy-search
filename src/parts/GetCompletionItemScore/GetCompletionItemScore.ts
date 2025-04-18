// based on https://github.com/microsoft/vscode/blob/3059063b805ed0ac10a6d9539e213386bfcfb852/src/vs/base/common/filters.ts by Microsoft (License MIT)
import * as IsGap from '../IsGap/IsGap.ts'

export const getScore = (
  rowCharLow: string,
  rowChar: string,
  columnCharBefore: string,
  columnCharLow: string,
  columnChar: string,
  isDiagonalMatch: boolean,
) => {
  if (rowCharLow !== columnCharLow) {
    return -1
  }
  const isMatch = rowChar === columnChar
  if (isMatch) {
    if (isDiagonalMatch) {
      return 8
    }
    if (IsGap.isGap(columnCharBefore, columnChar)) {
      return 8
    }
    return 5
  }
  if (IsGap.isGap(columnCharBefore, columnChar)) {
    return 8
  }
  return 5
}
