# Qlik SudokuChallenge

The goal of this program is to solve any given valid Sudoku puzzle in a finite amount of time. The program uses the backtracking algorithm seen at [http://norvig.com/sudoku.html](http://norvig.com/sudoku.html). The application is written in Angular2 and TypeScript.

+ Add new puzzles to `src/app/puzzles.ts`
+ Puzzles are of the format `puzzleName: puzzleString`
   * ex: { expert: '123456..' }
+ The puzzle displayed to the user is found in `src/app/grid/grid.service.ts`
+ Change the puzzle name in `getGrid()` to `PUZZLES.YOUR_PUZZLE_NAME`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
