// based on https://github.com/microsoft/vscode/blob/3059063b805ed0ac10a6d9539e213386bfcfb852/src/vs/base/common/filters.ts by Microsoft (License MIT)
import * as Character from '../Character/Character.ts'
import * as IsLowerCase from '../IsLowerCase/IsLowerCase.ts'
import * as IsUpperCase from '../IsUpperCase/IsUpperCase.ts'

export const isGap = (
  columnCharBefore: string,
  columnChar: string,
): boolean => {
  switch (columnCharBefore) {
    case Character.Dash:
    case Character.Dot:
    case Character.EmptyString:
    case Character.Space:
    case Character.T:
    case Character.Underline:
      return true
    default:
      break
  }
  return (
    IsLowerCase.isLowerCase(columnCharBefore) &&
    IsUpperCase.isUpperCase(columnChar)
  )
}
