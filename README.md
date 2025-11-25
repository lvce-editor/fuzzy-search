# @lvce-editor/fuzzy-search

Fuzzy search implementation based on VSCode's implementation of the Needleman–Wunsch algorithm.

## Install

```sh
npm install @lvce-editor/fuzzy-search
```

## Usage

```js
import * as FuzzySearch from '@lvce-editor/fuzzy-search'

const pattern = 'fd'
const word = 'font-display'

const result = FuzzySearch.fuzzySearch(pattern, word) // [0, 1, 5, 6] highlight chars 0-1 (f) and 5-6 (d)
```

## Credits

This project is based on VSCode's implementation of the Needleman–Wunsch algorithm.
