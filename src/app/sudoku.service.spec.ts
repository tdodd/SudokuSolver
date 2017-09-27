import { TestBed, async,  } from '@angular/core/testing';
import { SudokuService } from './sudoku.service';
import { ValidationService } from './validation.service';

let Sudoku: SudokuService;

// Mock Validation Service
class FakeValidationService extends ValidationService {
   validatePuzzle(puzzle: string) { return true; }
};

describe('SudokuService', () => {

   describe('#solve', () => {

      // Use mock validation service
      beforeEach(() => {
         Sudoku = new SudokuService(new FakeValidationService());
      });

      // Puzzles for testing
      // http://www.memory-improvement-tips.com/printable-sudoku-puzzles.html
      const easy = '.96.4..3..5782....1..9..5....9.1...85.......24...9.6....4..3..1....7926..2..5.98.';
      const easySolution = '296145837357826149148937526639512478581764392472398615964283751815479263723651984';

      const intermediate = '1.8..64....6.9.8.75........2695...8....4.9....8...2791........56.4.7.2....12..9.3';
      const intermediateSolution = '198756432326194857547328169269517384713489526485632791932841675654973218871265943';

      const hard = '96..4.1.....38....7.8.6...912.8..9.3....5....3.5..2.648...9.4.7....38.....9.2..85';
      const hardSolution = '962745138541389276738261549126874953497653812385912764853196427274538691619427385';

      const extreme = '.....6....59.....82....8....45........3........6..3.54...325..6..................';
      const extremeSolution = '438796215659132478271458693845219367713564829926873154194325786362987541587641932';

      it('should solve an easy puzzle', (done: any) => {
         Sudoku.solve(easy)
         .then(solution => {
            expect(solution).toEqual(easySolution);
            done();
         });
      });

      it('should solve an intermediate puzzle', (done: any) => {
         Sudoku.solve(intermediate)
            .then(solution => {
               expect(solution).toEqual(intermediateSolution);
               done();
            });
      });

      it('should solve a hard puzzle', (done: any) => {
         Sudoku.solve(hard)
            .then(solution => {
               expect(solution).toEqual(hardSolution);
               done();
            });
      });

   });

   describe('#makeGrid', () => {

      // Use mock validation service
      beforeEach(() => {
         Sudoku = new SudokuService(new FakeValidationService());
      });

      // Test data
      const grid = [
         'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1',
         'A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2',
         'A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3',
         'A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4',
         'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5',
         'A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6',
         'A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'I7',
         'A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8',
         'A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'I9'
      ];

      it('should return an array in row order', () => {
         expect(Sudoku.makeGrid()).toEqual(grid);
      });

      it('should return a grid of correct length', () => {
         expect(Sudoku.makeGrid().length).toEqual(81);
      });

   });

   describe('#makeHorizontalPeers', () => {

      // Use mock validation service
      beforeEach(() => {
         Sudoku = new SudokuService(new FakeValidationService());
      });

      // Test data
      const horizontalPeers = [
         ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'],
         ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9'],
         ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
         ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9'],
         ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'],
         ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'],
         ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9'],
         ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9'],
         ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9']
      ];

      it('should return the horizontal peers', () => {
         expect(Sudoku.makeHorizontalPeers()).toEqual(horizontalPeers);
      });

      it('should create 9 lists of horizontal peers', () => {
         expect(Sudoku.makeHorizontalPeers().length).toEqual(9);
      });

   });

   describe('#makeVerticalPeers', () => {

      // Use mock validation service
      beforeEach(() => {
         Sudoku = new SudokuService(new FakeValidationService());
      });

      // Test data
      const verticalPeers = [
         ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1'],
         ['A2', 'B2', 'C2', 'D2', 'E2', 'F2', 'G2', 'H2', 'I2'],
         ['A3', 'B3', 'C3', 'D3', 'E3', 'F3', 'G3', 'H3', 'I3'],
         ['A4', 'B4', 'C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4'],
         ['A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5'],
         ['A6', 'B6', 'C6', 'D6', 'E6', 'F6', 'G6', 'H6', 'I6'],
         ['A7', 'B7', 'C7', 'D7', 'E7', 'F7', 'G7', 'H7', 'I7'],
         ['A8', 'B8', 'C8', 'D8', 'E8', 'F8', 'G8', 'H8', 'I8'],
         ['A9', 'B9', 'C9', 'D9', 'E9', 'F9', 'G9', 'H9', 'I9']
      ];

      it('should return the vertical peers', () => {
         expect(Sudoku.makeVerticalPeers()).toEqual(verticalPeers);
      });

      it('should create 9 lists of vertical peers', () => {
         expect(Sudoku.makeVerticalPeers().length).toEqual(9);
      });

   });

   describe('#makeSquarePeers', () => {

      // Use mock validation service
      beforeEach(() => {
         Sudoku = new SudokuService(new FakeValidationService());
      });

      // Test data
      const squarePeers = [
         ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'],
         ['A4', 'A5', 'A6', 'B4', 'B5', 'B6', 'C4', 'C5', 'C6'],
         ['A7', 'A8', 'A9', 'B7', 'B8', 'B9', 'C7', 'C8', 'C9'],
         ['D1', 'D2', 'D3', 'E1', 'E2', 'E3', 'F1', 'F2', 'F3'],
         ['D4', 'D5', 'D6', 'E4', 'E5', 'E6', 'F4', 'F5', 'F6'],
         ['D7', 'D8', 'D9', 'E7', 'E8', 'E9', 'F7', 'F8', 'F9'],
         ['G1', 'G2', 'G3', 'H1', 'H2', 'H3', 'I1', 'I2', 'I3'],
         ['G4', 'G5', 'G6', 'H4', 'H5', 'H6', 'I4', 'I5', 'I6'],
         ['G7', 'G8', 'G9', 'H7', 'H8', 'H9', 'I7', 'I8', 'I9']
      ];

      it('should return the square peers', () => {
         expect(Sudoku.makeSquarePeers()).toEqual(squarePeers);
      });

      it('should create 9 lists of square peers', () => {
         expect(Sudoku.makeSquarePeers().length).toEqual(9);
      });

   });

   describe('#crossProduct', () => {

      // Use mock validation service
      beforeEach(() => {
         Sudoku = new SudokuService(new FakeValidationService());
      });

      // Test data
      const listA = 'abc';
      const listB = '123';
      const crossProduct = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3'];

      it('should return the cartesian product', () => {
         expect(Sudoku.crossProduct(listA, listB)).toEqual(crossProduct);
      });

      it('should return an empty set for empty lists', () => {
         expect(Sudoku.crossProduct(undefined, undefined)).toEqual([]);
      });

      it('should return the list when one is empty', () => {
         expect(Sudoku.crossProduct(listA, undefined)).toEqual(listA);
         expect(Sudoku.crossProduct(undefined, listB)).toEqual(listB);
      });

   });

});
